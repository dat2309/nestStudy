import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module'; // Import UserModule if needed
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, // Import UserModule if `AccountService` needs it
  ],
  providers: [AccountService],
  exports: [AccountService], // Export AccountService if needed in other modules
  controllers: [AccountController],
})
export class AccountModule { }
