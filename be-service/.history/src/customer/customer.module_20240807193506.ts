import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
