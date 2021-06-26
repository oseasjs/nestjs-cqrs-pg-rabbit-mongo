import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('api');

  const port = process.env.PORT ? +process.env.PORT : 8080;
  logger.log(`Application listerner on port '${port}'`);
  
  await app.listen(port);

}

bootstrap();
