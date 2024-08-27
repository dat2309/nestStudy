import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module'; // Import AccountModule if needed
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AccountModule), // Use forwardRef to handle circular dependencies
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService if needed
})
export class UserModule { }
