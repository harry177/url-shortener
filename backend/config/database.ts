import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    //database: "url_shortener",
    username: process.env.DB_USER,
    //username: "root",
    password: process.env.DB_PASSWORD,
    //password: "password",
    host: process.env.DB_HOST,
    //host: "db",
    dialect: 'mysql',
  });

export default sequelize;