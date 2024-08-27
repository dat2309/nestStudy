import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ResponseData } from 'src/responseClass';
import { HttpStatus } from 'src/responseEnum';
import { MediaResponse } from './media.interface';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ResponseData<MediaResponse | string>> {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        try {
            console.log(file)
            return new ResponseData<MediaResponse>(await this.mediaService.createMedia(file), HttpStatus.OK, ' uploaded successfully');
        } catch (error) {

            return new ResponseData<string>('Failed to upload avatar', HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
        }
    }
    @Get(':id')
    async getImage(@Param('id') id: string, @Res() res: Response) {
        try {
            const media = await this.mediaService.findMediaById(id);
            const downloadStream = await this.mediaService.getFileById(media.u);
            console.log(media)
            if (!downloadStream) {
                return res.status(404).send('media not found');
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
