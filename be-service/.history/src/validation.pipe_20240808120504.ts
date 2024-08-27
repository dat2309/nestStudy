import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform {

    transform(value: any, {metatype}: ArgumentMetadata) {
        if(!metatype || !this.toValidate(metatype)) {
            return value
        }
        const on
    }
    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}