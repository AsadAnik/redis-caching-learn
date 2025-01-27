import { Redis } from 'ioredis';

// Config variables..
const HOST: string = process.env.REDIS_HOST ?? 'localhost';
const PORT: number = Number(process.env.REDIS_PORT) ?? 6379;
// const USERNAME: string = process.env.REDIS_USERNAME ?? 'redis';
const PASSWORD: string = process.env.REDIS_PASSWORD ?? '12345678';

// Config Instance..
const redisClient = new Redis({
  host: HOST,
  port: PORT,
  // username: USERNAME,
  password: PASSWORD,
});

export default redisClient;