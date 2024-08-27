import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, UserRepository,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // Database host
      port: 5432,              // Database port
      username: 'postgres', // Database username
      password: 'postgres', // Database password
      database: 'first', // Database name
      entities: [User],        // List of entities
      synchronize: true,       // Auto-create database schema (development only)
    }),
  ],
})
export class AppModule { }
