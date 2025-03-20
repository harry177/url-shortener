import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { createUrl } from "../controllers/urlController";
import { Urls } from "../models/urlModel";

export const router = express.Router();

router.post("/shorten", async (req: Request, res: Response) => {
  try {
    const { originalUrl, expiresAt, alias } = req.body;

    // Check if provided alias already exists
    const existingUrl = await Urls.findOne({ where: { alias } });
    if (existingUrl) {
      return void res.status(400).json({ error: 'Alias already exists' });
    }

    let shortUrl = alias || uuidv4().slice(0, 6);

    // Check if generated shortUrl isn`t used yet
    while (await Urls.findOne({ where: { shortUrl } })) {
      shortUrl = uuidv4().slice(0, 6);
    }

    const createdUrl = await createUrl({ originalUrl, expiresAt, alias, shortUrl });
    res.status(201).json({ id: createdUrl.id, originalUrl, shortUrl: `http://localhost:5173/${createdUrl.shortUrl}` });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});