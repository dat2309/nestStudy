import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const obj = plainToInstance(metatype, value);
        const errors = await validate(obj);

        if (errors.length > 0) {
            // Return a custom error response
            return eturn {
                data: null,
                status: 400, // Use 400 status to indicate validation error
                message: this.formatErrorResponse(errors),
            };
        }

        return value;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
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
            status: 200, // Use 200 OK status
            message: errorMessages.join(', '),
        };
    }
}
