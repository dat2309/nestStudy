// src/media/media.service.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { GridFSBucket } from 'mongodb';
import { Connection } from 'mongoose';
import { createReadStream, ReadStream } from 'fs';

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
