
To implement login functionality for your Account entity in a NestJS application, you’ll need to add user authentication and session management. Here’s a guide to help you set up login functionality:

1. Install Dependencies
You'll need a few additional packages for authentication and session management:

bash
Copy code
npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt bcryptjs
2. Create Account Entity with Password
Make sure your Account entity includes a password field:

src/entities/account.entity.ts

typescript
Copy code
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    phone: string;

    @Column()
    password: string; // Add this field for password

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
3. Create AuthModule, AuthService, and AuthController
src/auth/auth.module.ts

typescript
Copy code
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    JwtModule.register({
      secret: 'your-jwt-secret', // Use environment variables for secrets
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
