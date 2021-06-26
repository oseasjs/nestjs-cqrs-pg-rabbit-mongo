import { Module } from "@nestjs/common";
import { Transport, ClientsModule } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit-mq.service';
import { vars } from '../config/vars';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: vars.createUserMessagePattern,
        transport: Transport.RMQ,
        options: {
          urls: [
            vars.rabbitMQUrl
          ],
          queue: vars.queueName,          
        },
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})

export class RabbitMQModule {}