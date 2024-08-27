import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MediaService } from './media.service';
import { ResponseData } from 'src/responseClass';
import { MediaResponse } from './media.interface';
import { HttpStatus } from 'src/responseEnum';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) : Promise<ResponseData<MediaResponse |string >> {
        if (!file) {
            throw new BadRequestException('No file uploaded');
          }
          try {
            console.log(file)
            return new ResponseData<MediaResponse>(await this.userService.uploadAvatar(userId, file), HttpStatus.OK, 'Avatar uploaded successfully');
          } catch (error) {
            if (error.status === HttpStatus.FORBIDDEN) {
              return new ResponseData<string>(error.message, HttpStatus.FORBIDDEN, 'Access denied');
            }
            if (error.status === HttpStatus.NOT_FOUND) {
              return new ResponseData<string>(error.message, HttpStatus.NOT_FOUND, 'User not found');
            }
            return new ResponseData<string>('Failed to upload avatar', HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
          }
        return this.mediaService.createMedia(file);
    }
    @Get(':id')
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
