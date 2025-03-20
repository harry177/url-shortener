import { Urls } from "../models/urlModel";
import { IUrl } from "../models/types";

export const createUrl = async (newUrl: Omit<IUrl, "id" | "shortUrl">): Promise<IUrl> => {
  try {
    const createdUrl = await Urls.create(newUrl);
    return createdUrl.toJSON() as IUrl;
  } catch (error) {
    throw error;
  }
};
