import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        return value;
    }
    const object = plainToInstance(metadata, value);
}