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
    getFileById(id: string): Promise<import("mongodb").GridFSBucketReadStream>;
}
