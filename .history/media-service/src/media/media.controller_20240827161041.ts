import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { GridFSBucket, MongoClient } from 'mongodb';
@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }
    private bucket: GridFSBucket;

    constructor() {
      const client = new MongoClient('mongodb://localhost:27017');
      const db = client.db('yourDatabaseName');
      this.bucket = new GridFSBucket(db);
    }
  
    async getFileById(fileId: string) {
      return this.bucket.openDownloadStream(new mongodb.ObjectId(fileId));
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.mediaService.createMedia(file);
    }
    // @Get(':filename')
    // async getImage(@Param('filename') filename: string, @Res() res: Response) {
    //     try {
    //         const imageBuffer = await this.mediaService.getImage(filename);
    //         res.setHeader('Content-Type', 'image/jpeg');  // Adjust the MIME type as needed
    //         res.send(imageBuffer);
    //     } catch (error) {
    //         res.status(404).send('Image not found');
    //     }
    // }
}
