import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserEvent } from './entities/user-event.entity';
import { RabbitMQService } from '../rabbitmq/rabbit-mq.service';
import { RabbitMQModule } from '../rabbitmq/rabbit-mq.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, UserEvent]),
    RabbitMQModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
