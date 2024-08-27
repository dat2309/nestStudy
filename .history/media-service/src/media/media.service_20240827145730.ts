// src/media/media.service.ts
import { Injectable } from '@nestjs/common';

import { ReadStream } from 'fs';
import { GridFSBucket } from 'mongodb';
import { Connection } from 'mongoose';

@Injectable()
export class MediaService {
    private bucket: GridFSBucket;

    constructor(@INjec private readonly connection: Connection) {
        this.bucket = new GridFSBucket(this.connection.db, {
            bucketName: 'media',
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<any> {
        const { originalname, buffer } = file;

        return new Promise((resolve, reject) => {
            const uploadStream = this.bucket.openUploadStream(originalname);
            uploadStream.write(buffer);
            uploadStream.end();

            uploadStream.on('finish', (result) => {
                resolve({
                    fileId: result._id,
                    filename: result.filename,
                });
            });

            uploadStream.on('error', (err) => {
                reject(err);
            });
        });
    }

    async getFileStream(fileId: string): Promise<ReadStream> {
        return this.bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    }
}
