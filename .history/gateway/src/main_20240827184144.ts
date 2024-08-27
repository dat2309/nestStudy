import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '',
  });
  app.use(express.json());
  await app.listen(3000);
}
bootstrap();
