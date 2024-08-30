import { Model } from 'mongoose';
import { Media, MediaResponse } from './media.interface';
export declare class MediaService {
    private readonly mediaModel;
    private bucket;
    constructor(mediaModel: Model<Media>);
    createMedia(file: Express.Multer.File): Promise<MediaResponse>;
    findMediaById(id: string): Promise<import("mongoose").Document<unknown, {}, Media> & Media & Required<{
        _id: unknown;
    }>>;
    findMediaByUrl(url: string): Promise<import("mongoose").Document<unknown, {}, Media> & Media & Required<{
        _id: unknown;
    }>>;
    getFileByUrl(url: string): Promise<import("mongodb").GridFSBucketReadStream>;
    findAndStreamMediaByUrl(url: string): Promise<{
        media: import("mongoose").Document<unknown, {}, Media> & Media & Required<{
            _id: unknown;
        }>;
        downloadStream: import("mongodb").GridFSBucketReadStream;
    }>;
}
