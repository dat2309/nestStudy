import { Response } from 'express';
import { ResponseData } from 'src/responseClass';
import { MediaResponse } from './media.interface';
import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadFile(file: Express.Multer.File): Promise<ResponseData<MediaResponse | string>>;
    getImage(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
