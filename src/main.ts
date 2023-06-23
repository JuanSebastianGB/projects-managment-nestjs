import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { corsOptions } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(morgan('dev'));

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.enableCors(corsOptions);

  await app.listen(configService.get('PORT'));
  console.log(
    `Listening on Port ${configService.get('PORT')} in ${configService.get(
      'NODE_ENV',
    )} mode`,
  );
}
bootstrap();
