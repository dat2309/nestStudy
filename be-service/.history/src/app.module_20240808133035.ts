import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // Database host
      port: 5432,              // Database port
      username: 'postgres', // Database username
      password: 'postgres', // Database password
      database: 'f', // Database name
      entities: [User],        // List of entities
      synchronize: true,       // Auto-create database schema (development only)
    }),
    , UserModule],
})
export class AppModule { }
