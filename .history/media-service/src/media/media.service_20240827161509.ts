import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GridFSBucket, MongoClient } from 'mongodb';
import { Model } from 'mongoose';
import { Media } from './media.interface';


@Injectable()
export class MediaService {
    private bucket: GridFSBucket;

    constructor(@InjectModel('Media') private readonly mediaModel: Model<Media>) {
        const client = new MongoClient(process.env.MONGODB_URI);// Adjust connection string as needed
        const db = client.db('media'); // Adjust database name
        this.bucket = new GridFSBucket(db);
    }

    async createMedia(file: Express.Multer.File) {
        const newMedia = new this.mediaModel({
            filename: file.originalname,
            mimetype: file.mimetype,
            encoding: file.encoding,
            url: file.filename, // Store GridFS filename
        });
        return await newMedia.save();
    }

    async getFileById(id: string) {
        const objectId = new ObjectId(id);
        return this.bucket.openDownloadStream(objectId);
    }
}
