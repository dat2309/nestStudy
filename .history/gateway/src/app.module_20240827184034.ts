import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProxyMiddleware } from './proxy.middleware';
import { MappedTypes } from '@nestjs/mapped-types';@Module({
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
