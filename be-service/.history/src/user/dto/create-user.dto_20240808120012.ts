import { MinLength } from "class-validator";

export class CreateUserDto {
    name: string;
    age: number;
    @MinLength(10)
    phone: string;
}
