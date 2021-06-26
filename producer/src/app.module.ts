import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RabbitMQModule } from './rabbitmq/rabbit-mq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeOrmConfig } from './config/postgres.typeorm.config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot(PostgresTypeOrmConfig),    
    RabbitMQModule, UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
