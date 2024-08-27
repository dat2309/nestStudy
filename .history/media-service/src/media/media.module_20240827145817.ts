import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('your-mongodb-connection-string'),
  ], 
  providers: [MediaService]
})
export class MediaModule {}
