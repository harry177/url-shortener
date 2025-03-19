import { apiClient } from "./instance";

export const createShortUrl = async (originalUrl: string): Promise<string> => {
  const response = await apiClient.post("/shorten", originalUrl);
  return response.data;
};
