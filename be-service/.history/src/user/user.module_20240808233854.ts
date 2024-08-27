import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module'; // Ensure this path is correct
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AccountModule), // Use forwardRef to handle circular dependency
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService if needed
})
export class UserModule { }
