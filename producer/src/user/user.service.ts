import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RabbitMQService } from '../rabbitmq/rabbit-mq.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserEvent, EventType } from './entities/user-event.entity';
import { vars } from '../config/vars';
import { AddUserStatusDto } from './dto/add-user-status.dto';


@Injectable()
export class UserService {

  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserEvent)
    private userEventRepository: Repository<UserEvent>,
    private readonly rabbitMQService: RabbitMQService    
    ) {

  }

  async create(seed: string, createUserDto: CreateUserDto) : Promise<void> {

    let user = new User();
    user.email = createUserDto.email;
    user.seed = seed;
    user.appId = vars.appId;

    return await this.userRepository
      .save(user)
      .then(async (u) => {

        let userEvent = new UserEvent();
        userEvent.eventType = EventType.CREATED;
        userEvent.userId = u.id;
        userEvent.seed = u.seed;
        userEvent.appId = vars.appId;
        userEvent.eventData = JSON.stringify(user);

        await this.userEventRepository
          .save(userEvent)
          .then(async () =>  {
            await this.rabbitMQService
              .send(u)
              .catch(e => {
                this.logger.error('Error send user message to queue: ', e);
                throw e;    
              });
          })
          .catch(e => {
            this.logger.error('Error saving user event: ', e);
            throw e;    
          });

        this.logger.verbose(`Create User on Producer with email: '${createUserDto.email}' with id ${u.id}`);

      })
      .catch(e => {
        this.logger.error('Error saving user: ', e);
        throw e;
      });

  }

  async addStatus(id: number, addUserStatusDto: AddUserStatusDto) : Promise<void>{

    await this.userRepository
      .findOne({id})
      .then(async (user) => {
        
        let userEvent = new UserEvent();
        userEvent.eventType = EventType[addUserStatusDto.status];
        userEvent.userId = user.id;
        userEvent.seed = addUserStatusDto.seed;
        userEvent.appId = vars.appId;
        userEvent.eventData = JSON.stringify(user);

        await this.userEventRepository
          .save(userEvent)
          .then(() => {
            this.logger.verbose(`Status '${userEvent.eventType}' added for user ${user.id}`);
          })
          .catch(e => {
            this.logger.error('Error addStatus Event: ', e);
            throw e;
          });

      })
      .catch(e => {
        this.logger.error(`Error addStatus for userId: '${id}'`, e);
        throw e;
      })
    
  }
}