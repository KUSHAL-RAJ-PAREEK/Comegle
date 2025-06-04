import Redis from "ioredis";

const api = process.env.REDIS || ""
export const redis = new Redis(api);

