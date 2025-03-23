import { apiClient } from "./instance";
import { InfoUrlResponse, RedirectUrlResponse, ShortUrlData, ShortUrlResponse } from "./types";

export const createShortUrl = async (data: ShortUrlData): Promise<ShortUrlResponse> => {
  const response = await apiClient.post("/shorten", data);
  return response.data;
};

export const redirectUrl = async (shortUrl: string): Promise<RedirectUrlResponse> => {
  const response = await apiClient.get(`/${shortUrl}`);
  return response.data;
}

export const deleteUrl = async (shortUrl: string): Promise<void> => {
  await apiClient.delete(`/delete/${shortUrl}`);
};

export const getUrlInfo = async (shortUrl: string): Promise<InfoUrlResponse> => {
  const response = await apiClient.get(`/info/${shortUrl}`);
  return response.data;
}