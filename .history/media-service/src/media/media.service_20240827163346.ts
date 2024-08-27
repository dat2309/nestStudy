import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GridFSBucket, MongoClient, ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Readable } from 'stream';
import { Media, MediaResponse } from './media.interface';

@Injectable()
export class MediaService {
    private bucket: GridFSBucket;

    constructor(@InjectModel('Media') private readonly mediaModel: Model<Media>) {
        const client = new MongoClient(process.env.MONGODB_URI);// Adjust connection string as needed
        const db = client.db('media'); // Adjust database name
        this.bucket = new GridFSBucket(db);
    }

    // async createMedia(file: Express.Multer.File) {
    //     // const newMedia = new this.mediaModel({
    //     //     filename: file.originalname,
    //     //     mimetype: file.mimetype,
    //     //     encoding: file.encoding,
    //     //     url: file.filename, // Store GridFS filename
    //     // });
    //     // return await newMedia.save();
    //     const readableStream = Readable.from(file.buffer); // Create a readable stream from the file buffer

    //     const uploadStream = this.bucket.openUploadStream(file.originalname, {
    //         contentType: file.mimetype,
    //         metadata: {
    //             encoding: file.encoding,
    //         },
    //     });

    //     // Pipe the file buffer to GridFS
    //     readableStream.pipe(uploadStream);

    //     return new Promise((resolve, reject) => {
    //         uploadStream.on('finish', async () => {
    //             const newMedia = new this.mediaModel({
    //                 filename: file.originalname,
    //                 mimetype: file.mimetype,
    //                 encoding: file.encoding,
    //                 url: uploadStream.id.toString(), // Store GridFS file ID
    //             });
    //             await newMedia.save();
    //             resolve(newMedia);
    //         });

    //         uploadStream.on('error', (error) => {
    //             reject(error);
    //         });
    //     });
    // }
    async createMedia(file: Express.Multer.File) :Promise<MediaResponse>  {
        const readableStream = Readable.from(file.buffer); // Create a readable stream from the file buffer

        const uploadStream = this.bucket.openUploadStream(file.originalname, {
            contentType: file.mimetype,
            metadata: {
                encoding: file.encoding,
            },
        });

        // Pipe the file buffer to GridFS
        readableStream.pipe(uploadStream);

        return new Promise((resolve, reject) => {
            uploadStream.on('finish', async () => {
                const newMedia = new this.mediaModel({
                    filename: file.originalname,
                    mimetype: file.mimetype,
                    encoding: file.encoding,
                    url: uploadStream.id.toString(), // Store GridFS file ID as a string
                });
                await newMedia.save();
                const media = {
                resolve(newMedia.url);
            });

            uploadStream.on('error', (error) => {
                reject(error);
            });
        });
    }

    async getFileById(id: string) {
        const objectId = new ObjectId(id);
        return this.bucket.openDownloadStream(objectId);
    }
}
