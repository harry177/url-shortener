import { DataTypes } from "sequelize";
import sequelize from "../config/database";

export const Urls = sequelize.define("new_urls", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  originalUrl: {
    type: DataTypes.STRING,
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
});
