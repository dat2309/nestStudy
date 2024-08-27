import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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
