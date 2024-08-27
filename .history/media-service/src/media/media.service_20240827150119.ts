// src/media/media.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { multerConfig } from './multer.config';  // Import Multer configuration

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaDevices) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))  // Apply Multer configuration
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.mediaService.uploadFile(file);
    return { 
      message: 'File uploaded successfully', 
      link: `/media/${result.fileId}` 
    };
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const fileStream = await this.mediaService.getFileStream(id);
    fileStream.pipe(res);
  }
}
