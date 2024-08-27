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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const responseClass_1 = require("../responseClass");
const responseEnum_1 = require("../responseEnum");
const media_service_1 = require("./media.service");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        try {
            return new responseClass_1.ResponseData(await this.mediaService.createMedia(file), responseEnum_1.HttpStatus.OK, ' uploaded successfully');
        }
        catch (error) {
            return new responseClass_1.ResponseData('Failed to upload avatar', responseEnum_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
        }
    }
    async getImage(id, res) {
        try {
            const media = await this.mediaService.findMediaById(id);
            console.log(media);
            const downloadStream = await this.mediaService.getFileById(media.url);
            if (!downloadStream) {
                return res.status(404).send('media not found');
            }
            res.setHeader('Content-Type', media.mimetype);
            downloadStream.on('data', (chunk) => {
                res.write(chunk);
            });
            downloadStream.on('end', () => {
                res.end();
            });
            downloadStream.on('error', (err) => {
                res.status(500).send('Error retrieving image');
            });
        }
        catch (error) {
            res.status(500).send('Error retrieving image');
        }
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getImage", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map