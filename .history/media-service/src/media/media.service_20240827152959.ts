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
            const uploadStream = this.bucket.openUploadStream(originalname);

            uploadStream.write(buffer, (err) => {
                if (err) {
                    console.error('Upload error:', err);
                    console.error('Error details:', err.stack);
                    reject(err);
                } else {
                    uploadStream.end((result) => {
                        if (result) {
                            resolve({
                                fileId: result._id,
                                filename: result.filename,
                            });
                        } else {
                            console.error('Upload error: result is undefined');
                            reject(new Error('Failed to upload file'));
                        }
                    });
                }
            });

            uploadStream.on('error', (err) => {
                console.error('Upload error:', err);
                console.error('Error details:', err.stack);
                reject(err);
            });
        });
    }

    getFileStream(fileId: string): GridFSBucketReadStream { // Change return type to GridFSBucketReadStream
        return this.bucket.openDownloadStream(new ObjectId(fileId)); // Use ObjectId from mongodb package
    }
}
