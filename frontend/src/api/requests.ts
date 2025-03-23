import { apiClient } from "./instance";
import { RedirectUrlResponse, ShortUrlData, ShortUrlResponse } from "./types";

export const createShortUrl = async (data: ShortUrlData): Promise<ShortUrlResponse> => {
  const response = await apiClient.post("/shorten", data);
  return response.data;
};

export const redirectUrl = async (shortUrl: string): Promise<RedirectUrlResponse> => {
  const response = await apiClient.get(`/${shortUrl}`);
  return response.data;
}