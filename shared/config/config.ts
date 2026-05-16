import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV,
  REDIS_URI: process.env.REDIS_URI,
};
