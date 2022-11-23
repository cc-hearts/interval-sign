import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntervalModule } from './interval/interval/interval.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import databaseProvider from './lib/database.provider';
import { LibModule } from './lib/lib.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),
    ...databaseProvider,
    LibModule,
    IntervalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
