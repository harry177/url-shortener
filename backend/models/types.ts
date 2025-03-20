import { RowDataPacket } from "mysql2";

export interface IUrl extends RowDataPacket {
  id?: number;
  originalUrl: string;
  shortUrl?: string;
  expiresAt?: Date;
  alias?: string;
}
