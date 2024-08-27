import { Document } from 'mongoose';

export interface Media extends Document {
    filename: string;
    mimetype: string;
    encoding: string;
    url: string;
}
export class  MediaResponse {
    url: string;
}
