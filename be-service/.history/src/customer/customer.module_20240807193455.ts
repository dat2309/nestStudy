import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[U]
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
