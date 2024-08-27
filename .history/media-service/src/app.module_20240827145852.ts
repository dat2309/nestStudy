import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [ MongooseModule.forRoot('your-mongodb-connection-string'), // Replace with your MongoDB connection string
    MediaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
