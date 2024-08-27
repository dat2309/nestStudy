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

        try {
            const uploadResult = await this.bucket.upload(buffer, {
                filename: originalname,
            });

            return {
                fileId: uploadResult._id,
                filename: uploadResult.filename,
            };
        } catch (err) {
            throw err;
        }
    }

    getFileStream(fileId: string): GridFSBucketReadStream { // Change return type to GridFSBucketReadStream
        return this.bucket.openDownloadStream(new ObjectId(fileId)); // Use ObjectId from mongodb package
    }
}
