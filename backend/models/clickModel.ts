import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { IClick } from "./types";

export const Clicks = sequelize.define<IClick>("clicks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  shortUrlId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "new_urls",
      key: "id",
    },
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
