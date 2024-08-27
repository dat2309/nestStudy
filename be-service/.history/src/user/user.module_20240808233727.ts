import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module'; // Import AccountModule
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  // Import AccountModule to resolve dependency
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService if needed in other modules
})
export class UserModule { }
