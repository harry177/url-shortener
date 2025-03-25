import { Clicks } from "../models/clickModel";
import { Urls } from "../models/urlModel";
import { IUrl } from "../models/types";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';


export const createShortUrl = async (req: Request<{ newUrlParams: Partial<IUrl>}>, res: Response) => {
  try {
    const { originalUrl, expiresAt, alias } = req.body;

    // Check if provided alias already exists
    if (alias) {
      const existingUrl = await Urls.findOne({ where: { alias } });
      if (existingUrl) {
        return void res.status(400).json({ error: 'Alias already exists' });
      }
    }

    let shortUrl = alias || uuidv4().slice(0, 7);

    // Check if generated shortUrl isn`t used yet
    while (await Urls.findOne({ where: { shortUrl } })) {
      shortUrl = uuidv4().slice(0, 7);
    }

    const createdUrl = await Urls.create({ originalUrl, expiresAt, alias, shortUrl });
    res.status(201).json({ id: createdUrl.id, originalUrl, shortUrl: `http://localhost:5173/${createdUrl.shortUrl}` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as Error).message });
  }
};

export const redirectToOriginalUrl = async (req: Request<{ shortUrl: Pick<IUrl, "shortUrl"> }>, res: Response) => {
  try {
    const { shortUrl } = req.params;

    // Find a record in db by shortUrl
    const url = await Urls.findOne({ where: { shortUrl } });

    if (!url) {
      return void res.status(404).json({ error: 'Short URL not found' });
    }

    // Check if URL has not expired
    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
      return void res.status(410).json({ error: 'Shortened URL has expired' });
    }

    if (url.id && url.originalUrl) {

      // Implement redirect to originalUrl
      res.status(200).json({originalUrl: url.originalUrl})

      // Add record of click data
      await Clicks.create({
        shortUrlId: url.id,
        ipAddress: req.socket.remoteAddress || '',
      });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteShortUrl = async (req: Request<{ shortUrl: Pick<IUrl, "shortUrl"> }>, res: Response) => {
  try {
    const { shortUrl } = req.params;

    const url = await Urls.findOne({ where: { shortUrl } });

    await Clicks.destroy({
      where: {
        shortUrlId: url?.id,
      },
    });

    const deletedCount = await Urls.destroy({
      where: {
        shortUrl
      }
    });

    if (deletedCount === 0) {
      return void res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting short URL' });
  }
};

export const getUrlInfo = async (req: Request<{ shortUrl: Pick<IUrl, "shortUrl"> }>, res: Response) => {
  try {
    const { shortUrl } = req.params;
    const url = await Urls.findOne({
      where: { shortUrl },
    });

    if (!url) {
      return void res.status(404).json({ error: 'URL not found' });
    }

    const { originalUrl, createdAt } = url;

    const clickCount = await Clicks.count({
      where: { shortUrlId: url.id },
    });

    res.status(200).json({
      originalUrl,
      createdAt,
      clickCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting URL info' });
  }
};

export const getAnalytics = async (req: Request<{ shortUrl: Pick<IUrl, "shortUrl"> }>, res: Response) => {
  try {
    const { shortUrl } = req.params;
    const url = await Urls.findOne({
      where: { shortUrl },
    });

    console.log(url)

    if (!url) {
      return void res.status(404).json({ error: 'URL not found' });
    }

    const clickCount = await Clicks.count({
      where: { shortUrlId: url.id },
    });

    const relatedClicks = await Clicks.findAll({
      where: { shortUrlId: url.id },
      attributes: ["ipAddress"],
      order: [["id", "DESC"]],
      limit: 5,
    });

    const ipAddresses = relatedClicks.map((click) => click.ipAddress);

    res.status(200).json({
      ipAddresses,
      clickCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting Analytics info' });
  }
};