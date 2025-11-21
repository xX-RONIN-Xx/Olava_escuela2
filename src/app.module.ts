import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';

@Module({
   imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT ?? '3306'),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false, // La DB ya existe en Clever Cloud
      extra: {
  connectionLimit: 2,
  waitForConnections: true,
  queueLimit: 0,
},
    }),
    CiudadModule,
  ],
  controllers: [AppController],
  providers: [AppService],





    /***************************
  imports: [    TypeOrmModule.forRoot( {
    "type": "mysql",
    "host": "ba4e4i9as5mtw7y63ooi-mysql.services.clever-cloud.com",
    "port": 3306,
    "username": "uh0ou6fetygfaw5v",
    "password": "mCbLRMWuqEeJZOAh6Qlt",
    "database": "ba4e4i9as5mtw7y63ooi",*/
    //"entities": [__dirname + '/**/*.entity.{js,ts}'], //render compila a dist

          //"dist/**/**.entity{.ts,.js}"],
   /* "synchronize": false
   }
    ), CiudadModule,
],
  controllers: [AppController],
  providers: [AppService],*/
})
export class AppModule {}
