import { RowDataPacket } from "mysql2";

export type CallbackType = (err: Error | null, result?: any) => void;

export interface IUrl extends RowDataPacket {
  id: number;
  originalUrl: string;
}
