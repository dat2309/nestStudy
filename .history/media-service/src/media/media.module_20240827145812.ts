import { Module } from '@nestjs/common';
import { MediaService } from './media.service';

@Module({
  imports: [
    MongooseModule.forRoot('your-mongodb-connection-string'),
  ], 
  providers: [MediaService]
})
export class MediaModule {}
