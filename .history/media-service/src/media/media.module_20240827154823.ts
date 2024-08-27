import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaController } from './media.controller';
import { MediaSchema } from './media.schema';
import { MediaService } from './media.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Media', schema: MediaSchema }]),
  GridFSModule.forRoot({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  }),],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule { }
