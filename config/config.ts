import dotenv from "dotenv";

dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV;

export const PORT = process.env.PORT;

export const TYPEORM = {
  CONNECTION: process.env.TYPEORM_CONNECTION,
  HOST: process.env.TYPEORM_HOST,
  USERNAME: process.env.TYPEORM_USERNAME,
  PASSWORD: process.env.TYPEORM_PASSWORD,
  DATABASE: process.env.TYPEORM_DATABASE,
  PORT: process.env.TYPEORM_PORT,
};

export const URL = {
  API: process.env.API_URL,
};
