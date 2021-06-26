import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user-query.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProducerSyncService } from './user-producer-sync.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
    HttpModule
  ],
  controllers: [UserController],
  providers: [UserService, UserProducerSyncService]
})
export class UserModule {}
