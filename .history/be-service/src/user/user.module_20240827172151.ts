import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module'; // Import AccountModule if needed
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AccountModule), // Use forwardRef if there's a circular dependency
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Ensure UserService is exported
})
export class UserModule { }
