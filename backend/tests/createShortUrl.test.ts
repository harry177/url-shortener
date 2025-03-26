import request from "supertest";
import app from "..";
import { Urls } from "../models/urlModel";

jest.mock("../models/urlModel", () => ({ // Mocking the Sequelize model
  Urls: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  }));

describe("POST /shorten", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before every test
  });

  it("should generate a unique short URL if alias is not provided", async () => {
    // Mocking db behavior: first check - shortUrl existed already, second — not
    (Urls.findOne as jest.Mock)
      .mockResolvedValueOnce({ shortUrl: "abc1234" })
      .mockResolvedValueOnce(null);

    (Urls.create as jest.Mock).mockResolvedValue({
      id: 1,
      originalUrl: "https://example.com",
      shortUrl: "xyz5678",
    });

    const response = await request(app)
      .post("/api/shorten")
      .send({ originalUrl: "https://example.com" });

    expect(response.status).toBe(201);
    expect(response.body.shortUrl).toContain("http://localhost:5173/");
    expect(Urls.findOne).toHaveBeenCalledTimes(2); // Checking uniqueness 2 times
    expect(Urls.create).toHaveBeenCalled();
  });

  it("should return an error if alias is already taken", async () => {
    (Urls.findOne as jest.Mock).mockResolvedValueOnce({ alias: "customAlias" });

    const response = await request(app)
      .post("/api/shorten")
      .send({ originalUrl: "https://example.com", alias: "customAlias" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Alias already exists");
    expect(Urls.findOne).toHaveBeenCalledTimes(1); // Alias check was 1 time
    expect(Urls.create).not.toHaveBeenCalled(); // Creation shoudn`t happen
  });

  it("should allow creating a short URL with a unique alias", async () => {
    (Urls.findOne as jest.Mock).mockResolvedValue(null); // Alias doen`t exist

    (Urls.create as jest.Mock).mockResolvedValue({
      id: 2,
      originalUrl: "https://another-example.com",
      shortUrl: "customAlias",
    });

    const response = await request(app)
      .post("/api/shorten")
      .send({ originalUrl: "https://another-example.com", alias: "customAlias" });

    expect(response.status).toBe(201);
    expect(response.body.shortUrl).toContain("http://localhost:5173/customAlias");
    expect(Urls.create).toHaveBeenCalled();
  });
});