import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL! + "?family=0");

export default redis;
