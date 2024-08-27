// src/media/media.controller.ts
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MediaService } from './media.service';
import { multerConfig } from './multer.config'; // Import Multer configuration

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

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
