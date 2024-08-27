import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media } from './media.interface';


@Injectable()
export class MediaService {
    
    constructor(@InjectModel('Media') private readonly mediaModel: Model<Media>) { }

    async createMedia(file: Express.Multer.File) {
        const newMedia = new this.mediaModel({
            filename: file.originalname,
            mimetype: file.mimetype,
            encoding: file.encoding,
            url: file.path,
        });
        return await newMedia.save();
    }
}
