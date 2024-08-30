import { Schema } from 'mongoose';
export declare const MediaSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    filename?: string;
    mimetype?: string;
    encoding?: string;
    size?: string;
    url?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    filename?: string;
    mimetype?: string;
    encoding?: string;
    size?: string;
    url?: string;
}>> & import("mongoose").FlatRecord<{
    filename?: string;
    mimetype?: string;
    encoding?: string;
    size?: string;
    url?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
