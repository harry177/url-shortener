import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');

    connection.query(`
        CREATE TABLE IF NOT EXISTS urls (
            id INT AUTO_INCREMENT PRIMARY KEY,
            originalUrl TEXT NOT NULL
        )
    `);
});

export default connection;