import { Controller, Post, UseInterceptors, UploadedFile, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.mediaService.createMedia(file);
  }
  @Get('image/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imageBuffer = await this.mediaService.getImage(filename);
    res.set('Content-Type', 'image/jpeg');  // Adjust based on the image type
    res.send(imageBuffer);
  }
}
