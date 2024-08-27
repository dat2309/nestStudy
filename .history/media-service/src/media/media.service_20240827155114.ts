import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GridFSBucket } from 'mongodb';
import mongoose, { Model } from 'mongoose';
import { Media } from './media.interface';
@Injectable()
export class MediaService {
    private readonly bucket: GridFSBucket;
    constructor(@InjectModel('Media') private readonly mediaModel: Model<Media>) {
        this.bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'media' });
    }

    async createMedia(file: Express.Multer.File) {
        const newMedia = new this.mediaModel({
            filename: file.originalname,
            mimetype: file.mimetype,
            encoding: file.encoding,
            url: file.path,
        });
        return await newMedia.save();
    }
    async getImage(filename: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
          const chunks: Buffer[] = [];
          const stream = this.bucket.openDownloadStreamByName(filename);
    
          stream.on('data', (chunk) => chunks.push(chunk));
          stream.on('end', () => resolve(Buffer.concat(chunks)));
          stream.on('error', (error) => reject(error));
        });
      }
}
