// src/media/media.controller.ts
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const result = await this.mediaService.uploadFile(file);
        return {
            message: 'File uploaded successfully',
            link: `/media/${result.fileId}`
        };
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res: Response) {
        const fileStream = this.mediaService.getFileStream(id);
        res.set({
            'Content-Type': 'application/octet-stream', // Set appropriate content type
            'Content-Disposition': `attachment; filename="${id}"` // Customize as needed
        });
        fileStream.pipe(res); // Stream file to response
    }
}
