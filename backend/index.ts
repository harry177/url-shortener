import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { router } from "./routes/routes";
import sequelize from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use((req, res, next) => {  
  res.setHeader('Access-Control-Allow-Headers', '*');  
  next();   
});
app.use(bodyParser.json());

app.use("/api", router);

if (process.env.NODE_ENV !== "test") {
sequelize.sync()
  .then(() => {
    console.log('Connected to MySQL database');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
}

export default app;