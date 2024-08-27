import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GridFSBucket, MongoClient } from 'mongodb';
import { Model } from 'mongoose';
import { Media } from './media.schema'; // Adjust the import as necessary

@Injectable()
export class MediaService {
    private bucket: GridFSBucket;

    constructor(@InjectModel('Media') private readonly mediaModel: Model<Media>) {
        const client = new MongoClient('mongodb://localhost:27017'); // Adjust connection string as needed
        const db = client.db('yourDatabaseName'); // Adjust database name
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
        return this.bucket.openDownloadStream(new MongoClient.ObjectId(id));
    }
}
