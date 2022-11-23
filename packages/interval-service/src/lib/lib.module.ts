import { Global, Module } from '@nestjs/common';
import { ToolService } from './tools/tool.service';
import { RedisService } from './redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Global() // 全局模块的定义  Nest 中只能定义一个全局模块
@Module({
  providers: [ToolService, RedisService, ConfigService],
  exports: [ToolService, RedisService, ConfigService],
})
export class LibModule {}
