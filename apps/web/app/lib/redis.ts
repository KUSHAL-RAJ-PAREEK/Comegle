import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
const api = process.env.REDIS || ""
export const redis = new Redis(api);

