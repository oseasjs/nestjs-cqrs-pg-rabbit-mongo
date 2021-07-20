import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const DB_HOST = (process.env.DOCKER_HOST) ? process.env.DOCKER_HOST : 'localhost';

export const PostgresTypeOrmConfig : TypeOrmModuleOptions = {

    type: 'postgres',
    host: DB_HOST,
    port: 15432,
    username: 'admin',
    password: 'admin',
    database: 'postgres',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true,

}