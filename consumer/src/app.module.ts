import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { vars } from './config/vars';

@Module({
  imports: [
    MongooseModule.forRoot(vars.mongoConnectionUrl),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
