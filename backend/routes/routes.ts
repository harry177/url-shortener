import express from "express";
import { createShortUrl, redirectToOriginalUrl } from "../controllers/urlController";

export const router = express.Router();

router.post("/shorten", createShortUrl);
router.get('/:shortUrl', redirectToOriginalUrl);