export interface ShortUrlData {
  originalUrl: string;
  expiresAt?: Date;
  alias?: string;
}

export interface ShortUrlResponse extends ShortUrlData {
  id: number;
  shortUrl: string;
}

export interface RedirectUrlResponse {
  originalUrl: string | null;
  error?: string;
  
}