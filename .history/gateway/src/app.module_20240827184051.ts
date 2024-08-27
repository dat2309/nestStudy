import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MappedTypes } from '@nestjs/mapped-types';

import { ProxyMiddleware } from './proxy.middleware';
@Module({
  imports: [MappedTypes],
  // your other module configurations
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyMiddleware)
      .forRoutes('*'); // Apply middleware to all routes
  }
}
