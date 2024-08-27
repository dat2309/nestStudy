import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule,
    JwtModule.register({
      secret: 'datne123',  // Store this in environment variables
      signOptions: { expiresIn: '1h' },
    }),
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
  
    AccountModule,
  ],
})
export class AppModule { }
