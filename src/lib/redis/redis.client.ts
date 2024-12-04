import { Redis } from 'ioredis';

// Config variables..
const HOST: string = process.env.REDIS_HOST ?? 'localhost';
const PORT: number = Number(process.env.REDIS_PORT ?? 6379);
const PASSWORD: string = process.env.REDIS_PASSWORD ?? '12345678';
const DB: number = Number(process.env.REDIS_EXPIRE_TIME ?? 0);


// Config Instance..
const redisClient = new Redis({
  host: HOST,
  port: PORT,
  password: PASSWORD,
  db: DB,
});

// Some events to handle multiple scenarios
redisClient.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redisClient.on('error', (error) => {
  console.error('❌ Redis Error:', error.message);
});

redisClient.on('close', () => {
  console.warn('⚠️ Redis connection closed');
});

redisClient.on('reconnecting', () => {
  console.log('🔄 Reconnecting to Redis...');
});

export default redisClient;