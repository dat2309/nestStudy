import { Schema } from 'mongoose';

export const MediaSchema = new Schema({
    filename: String,
    mimetype: String,
    encoding: String,
    size: String,
    url: String,
});
