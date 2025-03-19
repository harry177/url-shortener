import express from "express";
import * as urlController from "../controllers/urlController";

export const router = express.Router();

router.post("/shorten", urlController.createUrl);