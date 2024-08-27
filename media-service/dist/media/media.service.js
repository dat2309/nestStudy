"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const stream_1 = require("stream");
let MediaService = class MediaService {
    constructor(mediaModel) {
        this.mediaModel = mediaModel;
        const client = new mongodb_1.MongoClient(process.env.MONGODB_URI);
        const db = client.db('media');
        this.bucket = new mongodb_1.GridFSBucket(db);
    }
    async createMedia(file) {
        const readableStream = stream_1.Readable.from(file.buffer);
        const uploadStream = this.bucket.openUploadStream(file.originalname, {
            contentType: file.mimetype,
            metadata: {
                encoding: file.encoding,
            },
        });
        readableStream.pipe(uploadStream);
        return new Promise((resolve, reject) => {
            uploadStream.on('finish', async () => {
                const newMedia = new this.mediaModel({
                    filename: file.originalname,
                    mimetype: file.mimetype,
                    encoding: file.encoding,
                    url: uploadStream.id.toString(),
                });
                await newMedia.save();
                const mediaResponse = { url: newMedia._id.toString() };
                resolve(mediaResponse);
            });
            uploadStream.on('error', (error) => {
                reject(error);
            });
        });
    }
    async findMediaById(id) {
        return this.mediaModel.findById(id).exec();
    }
    async getFileById(id) {
        const objectId = new mongodb_1.ObjectId(id);
        return this.bucket.openDownloadStream(objectId);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Media')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MediaService);
//# sourceMappingURL=media.service.js.map