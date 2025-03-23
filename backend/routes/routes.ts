import express from "express";
import {
  createShortUrl,
  deleteShortUrl,
  getUrlInfo,
  redirectToOriginalUrl,
} from "../controllers/urlController";

export const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortUrl", redirectToOriginalUrl);
router.delete("/delete/:shortUrl", deleteShortUrl);
router.get("/info/:shortUrl", getUrlInfo);
