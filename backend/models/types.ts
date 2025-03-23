//import { RowDataPacket } from "mysql2";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface IUrl extends Model<InferAttributes<IUrl>, InferCreationAttributes<IUrl>> {
  id?: number;
  originalUrl?: string;
  shortUrl?: string;
  expiresAt?: Date;
  alias?: string;
}