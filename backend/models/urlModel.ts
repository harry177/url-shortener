import db from "../config/database";
import { CallbackType, IUrl } from "./types";

export const createUrl = (newUrl: Omit<IUrl, 'id'>, callback: CallbackType) => {
    db.query("INSERT INTO urls SET ?", newUrl, callback);
  };