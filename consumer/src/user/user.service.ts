import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument, EventType } from './entities/user-query.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { vars } from '../config/vars';
import { UserProducerSyncService } from './user-producer-sync.service';

@Injectable()
export class UserService {

  private logger = new Logger('UserService');

  constructor(@InjectModel(User.name) 
    private UserModel: Model<UserDocument>,
    private userProducerSyncService: UserProducerSyncService) {

  }

  async create(createUserDto: CreateUserDto) {    

    const userModel = new this.UserModel();
    userModel.id = createUserDto.id;
    userModel.email = createUserDto.email;
    userModel.seed = createUserDto.seed;
    userModel.appId = vars.appId;
    userModel.currentStatus = EventType.SYNCRONIZED;

    return await userModel
      .save()
      .then(async (u) => {
        this.logger.verbose(`User created on Mongo for email: '${u.email}' for user with id: ${u.id}`);
        await this.userProducerSyncService.sendStatus(u.id, u.seed, EventType.SYNCRONIZED);
        this.logger.verbose(`New status '${u.currentStatus}' sended to producer server for user: ${u.id}`);
      });

  }
  
}
