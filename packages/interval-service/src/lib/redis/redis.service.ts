import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { Result, ClientContext } from 'ioredis';
import { isObject } from 'src/utils/shard';
// @see https://www.npmjs.com/package/ioredis

type redisVal = string | Buffer | number;
@Injectable()
export class RedisService {
  public redisClient: Redis;
  constructor(private config: ConfigService) {}
  onModuleInit() {
    if (!this.redisClient) {
      this.createRedisClient();
    }
  }
  private createRedisClient() {
    const redisConfig = this.config.get('redis');
    this.redisClient = new Redis(redisConfig);
  }

  public async set(
    key: string,
    value: redisVal,
  ): Promise<Result<'OK', ClientContext>>;
  public async set(
    key: string,
    value: redisVal,
    seconds: number,
  ): Promise<Result<'OK', ClientContext>>;
  public async set(
    key: string,
    value: redisVal,
    seconds?: number,
  ): Promise<Result<'OK', ClientContext> | null> {
    try {
      const val = isObject(value) ? JSON.stringify(value) : value;
      if (seconds) {
        return await this.redisClient.set(key, val, 'EX', seconds);
      } else {
        return await this.redisClient.set(key, val);
      }
    } catch (e) {
      console.log('redis error set value', e);
      return null;
    }
  }

  public async get(key: string): Promise<Result<string | null, ClientContext>> {
    return await this.redisClient.get(key);
  }

  public async del(key: string): Promise<Result<number, ClientContext>> {
    return await this.redisClient.del(key);
  }
}
