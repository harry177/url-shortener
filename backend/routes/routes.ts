import express from "express";
import {
  createShortUrl,
  deleteShortUrl,
  redirectToOriginalUrl,
} from "../controllers/urlController";

export const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortUrl", redirectToOriginalUrl);
router.delete("/delete/:shortUrl", deleteShortUrl);
