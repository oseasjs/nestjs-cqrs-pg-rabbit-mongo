import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { vars } from '../config/vars';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RabbitMQService {

  private logger = new Logger('RabbitMQService');

  constructor(
    @Inject(vars.createUserMessagePattern) private readonly rabbitMQClient: ClientProxy,
    ) {
  }

  async send(user: User) : Promise<void> {
    await this
      .rabbitMQClient
      .emit(vars.createUserMessagePattern, user)
      .toPromise()
      .catch(e => {
        this.logger.error('Erro sending message to user queue', e);
        console.log(e);
        throw e;
      });
  }

}