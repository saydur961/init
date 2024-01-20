import { createClient } from 'redis';
import { RedisRepository } from './redis.repository';

export const client = createClient();
export const redisRepo = new RedisRepository(client);