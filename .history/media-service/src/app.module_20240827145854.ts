import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [ MongooseModule.forRoot('your-mongodb-connection-string'), // Replace with your MongoDB connection string
    MediaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
