import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { IUrl } from "./types";

export const Urls = sequelize.define<IUrl>("new_urls", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  originalUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
