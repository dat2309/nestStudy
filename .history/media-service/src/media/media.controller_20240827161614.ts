import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.mediaService.createMedia(file);
    }
    @Get('image/:id')
    async getImage(@Param('id') id: string, @Res() res: Response) {
        try {
            const downloadStream = await this.mediaService.getFileById(id);

            if (!downloadStream) {
                return res.status(404).send('Image not found');
            }

            res.setHeader('Content-Type', 'image/jpeg'); // Set the correct MIME type

            downloadStream.on('data', (chunk) => {
                res.write(chunk);
            });

            downloadStream.on('end', () => {
                res.end();
            });

            downloadStream.on('error', (err) => {
                res.status(500).send('Error retrieving image');
            });

        } catch (error) {
            res.status(500).send('Error retrieving image');
        }
    }
}
