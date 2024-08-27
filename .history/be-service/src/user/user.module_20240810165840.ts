import { MiddlewareConsumer, Module, NestModule, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module'; // Import AccountModule if needed
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CustomHeaderMiddleware } from 'src/global/custom.header.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AccountModule), // Use forwardRef if there's a circular dependency
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Ensure UserService is exported
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomHeaderMiddleware)
      .forRoutes(UserController); // Apply only to routes handled by UserController
  }
}
