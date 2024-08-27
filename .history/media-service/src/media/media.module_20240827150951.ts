import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaController } from './media.controller';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
  ], 
  providers: [MediaService], controllers: [MediaController]
})
export class MediaModule {}
