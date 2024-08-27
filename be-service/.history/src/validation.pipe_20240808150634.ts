import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        const obj = plainToInstance(metatype, value)
        const errors = await validate(obj)
        if ((errors).length > 0) {
            throw new BadRequestException(this.formatErrors(errors))
        }
        return value
    }
    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
    private formatErrorResponse(errors: ValidationError[]): any {
        const errorMessages = errors.map(error => {
            if (error.constraints) {
                return Object.values(error.constraints)[0]; // Return the first error message
            }
            return 'Validation failed';
        });
        
        return {
            data: null,
            status: 400,
            message: errorMessages.join(', '),
        };
    }
}