import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const api = process.env.REDIS || ""
export const redis = new Redis(api);

