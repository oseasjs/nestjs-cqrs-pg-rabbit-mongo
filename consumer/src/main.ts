import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { vars } from './config/vars';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('main');

  const app = await NestFactory.createMicroservice(AppModule, {
    // logger: ['error', 'warn'],
    transport: Transport.RMQ,
    options: {
      urls: [
        vars.rabbitMQUrl,
      ],
      queue: vars.queueName,
    },
  });

  logger.log(`Application listerner on appId '${vars.appId}'`);

  app.listenAsync(); 

}

bootstrap();
