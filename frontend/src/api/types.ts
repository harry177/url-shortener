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

export interface InfoUrlResponse extends RedirectUrlResponse {
  createdAt?: string;
  clickCount?: number;
}

export interface AnalyticsResponse {
  clickCount?: number;
  ipAddresses?: string[];
}