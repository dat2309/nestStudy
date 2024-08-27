// src/media/media.service.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket, GridFSBucketReadStream, ObjectId } from 'mongodb'; // Import correct types

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
    con
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

  getFileStream(fileId: string): GridFSBucketReadStream { // Change return type to GridFSBucketReadStream
    return this.bucket.openDownloadStream(new ObjectId(fileId)); // Use ObjectId from mongodb package
  }
}
