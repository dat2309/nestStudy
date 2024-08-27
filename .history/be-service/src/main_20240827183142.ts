import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { HeadersInterceptor } from './global/headers.interceptor';
import { TransformInterceptor } from './global/transform.interceptor';
import { ValidationPipe } from './validation.pipe';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '',
  });
  app.useGlobalPipes(new ValidationPipe());
  app
  app.useGlobalInterceptors(new HeadersInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The User API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
// This interceptor will transform the outgoing data using class-transformer decorators

// Start the application and listen on port 4000
