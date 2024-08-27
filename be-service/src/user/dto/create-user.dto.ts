import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'User name', example: 'John Doe' })
    name: string;
    @ApiProperty({ description: 'User age', example: 30 })
    age: number;
    @ApiProperty({ description: 'User phone number', example: '123-456-7890' })
    @MinLength(10, { message: "Số điện thoại tối thiểu 10" })
    phone: string;
}
