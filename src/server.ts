import 'dotenv/config';
import { app } from './app';
import { redis } from "./infra/redis/RedisClient";

const PORT = process.env.PORT || 3333;

async function start() {

  await redis.connect();

  app.listen(PORT, () => {
    console.log(`initial page: http://localhost:${PORT}`);
    console.log(`ping: http://localhost:${PORT}/status`);
  });
}

start();