// src/media/media.service.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { GridFSBucket, GridFSBucketReadStream, ObjectId } from 'mongodb'; // Import correct types
import { Connection } from 'mongoose';

@Injectable()
export class MediaService {
    private bucket: GridFSBucket;

    constructor(@InjectConnection() private readonly connection: Connection) {
        this.bucket = new GridFSBucket(this.connection.db, {
            bucketName: 'media',
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<any> {
        const { originalname, buffer } = file;
        console.log(originalname, buffer);

        return new Promise((resolve, reject) => {
            this.bucket.upload(buffer, { filename: originalname }, (err, file) => {
                if (err) {
                    console.error('Upload error:', err);
                    console.error('Error details:', err.stack);
                    reject(err);
                } else {
                    console.log('Upload finished:', file);
                    resolve({
                        fileId: file._id,
                        filename: file.filename,
                    });
                }
            });
        });
    }

    getFileStream(fileId: string): GridFSBucketReadStream { // Change return type to GridFSBucketReadStream
        return this.bucket.openDownloadStream(new ObjectId(fileId)); // Use ObjectId from mongodb package
    }
}
