import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface IUrl extends Model<InferAttributes<IUrl>, InferCreationAttributes<IUrl>> {
  id?: number;
  originalUrl?: string;
  shortUrl?: string;
  expiresAt?: Date;
  alias?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IClick extends Model<InferAttributes<IClick>, InferCreationAttributes<IClick>> {
  id?: number;
  shortUrlId: number;
  ipAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}