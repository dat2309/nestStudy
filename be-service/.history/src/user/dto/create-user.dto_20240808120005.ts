export class CreateUserDto {
    name: string;
    age: number;
    @MinLength(10)
    phone: string;
}
