import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getDefaultConfig } from './utils/shard';
import { HttpExceptionFilter } from './expection/http.expection';
import { ResponseInterceptor } from './interfaces/interfaces';
import { AuthGuard } from './guard/auth.guard';
import { RedisService } from './lib/redis/redis.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { http } = getDefaultConfig();
  const port = http.port || 3664;
  const prefix = http.prefix || 'api';
  app.setGlobalPrefix(prefix);

  app.useGlobalGuards(new AuthGuard(app.get<RedisService>(RedisService), http));

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`启动成功http://localhost:${port}/${prefix}`);
  });
}
bootstrap();
