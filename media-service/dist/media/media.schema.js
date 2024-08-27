"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MediaSchema = new mongoose_1.Schema({
    filename: String,
    mimetype: String,
    encoding: String,
    url: String,
});
//# sourceMappingURL=media.schema.js.map