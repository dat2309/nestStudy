import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  providers: [MediaService], controllers: [MediaController]
})
export class MediaModule { }
