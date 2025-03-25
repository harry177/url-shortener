import express from "express";
import {
  createShortUrl,
  deleteShortUrl,
  getAnalytics,
  getUrlInfo,
  redirectToOriginalUrl,
} from "../controllers/urlController";

export const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortUrl", redirectToOriginalUrl);
router.delete("/delete/:shortUrl", deleteShortUrl);
router.get("/info/:shortUrl", getUrlInfo);
router.get("/analytics/:shortUrl", getAnalytics);
