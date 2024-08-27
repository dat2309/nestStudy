import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaModule } from './media/media.module';


@Module({
  imports: [ MongooseModule.forRoot(process.env.JWT_SECRET), // Replace with your MongoDB connection string
    MediaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
