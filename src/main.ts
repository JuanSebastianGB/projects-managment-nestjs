import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  const configService = app.get(ConfigService);
  console.log({ port: configService.get('PORT'), env: process.env.NODE_ENV });
  await app.listen(configService.get('PORT'));
}
bootstrap();
