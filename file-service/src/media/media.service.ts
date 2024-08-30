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

    async createMedia(file: Express.Multer.File): Promise<MediaResponse> {
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
                    size: file.size,
                    url: uploadStream.id.toString(), // Store GridFS file ID as a string
                });
                await newMedia.save();
                const mediaResponse = { url: uploadStream.id.toString() };
                resolve(mediaResponse);
            });

            uploadStream.on('error', (error) => {
                reject(error);
            });
        });
    }

    async findMediaById(id: string) {
        return this.mediaModel.findById(id).exec(); // Retrieves the media document by its _id

    }

    async findMediaByUrl(url: string) {
        return this.mediaModel.findOne({ url }).exec();; // Retrieves the media document by its url
    }

    async getFileByUrl(url: string) {
        const objectId = new ObjectId(url);
        return this.bucket.openDownloadStream(objectId);
    }

     async findAndStreamMediaByUrl(url: string) {
        // Find the media document by URL
        const media = await this.mediaModel.findOne({ url }).exec();

        if (!media) {
            return { media: null, downloadStream: null };
        }

        // Create a download stream from GridFS using the URL (converted to ObjectId)
        const objectId = new ObjectId(url);
        const downloadStream = this.bucket.openDownloadStream(objectId);

        return { media, downloadStream };
    }
}
