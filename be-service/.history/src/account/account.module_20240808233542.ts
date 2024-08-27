import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './entities/account.entity';
import { UserModule } from '../user/user.module'; // Import UserModule if needed

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
export class AccountModule {}
