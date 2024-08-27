import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), // Replace with your MongoDB connection string
    MediaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
