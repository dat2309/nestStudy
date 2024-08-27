import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [UserModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
