import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module'; // Ensure this import is correct
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repository/account.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule), // Use forwardRef if there's a circular dependency
  ],
  providers: [AccountService],
  exports: [AccountService, AccountRepository], // Export AccountService if needed
  controllers: [AccountController],
})
export class AccountModule { }
