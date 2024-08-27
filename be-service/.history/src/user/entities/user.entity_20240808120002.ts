import { MinLength } from "class-validator";
export class User {
    private static idCounter = 0;
    id: number;
    name: string;
    age: number;
    phone: string;

    constructor(name?: string, age?: number, phone?: string) {
        this.id = User.idCounter++;
        this.name = name ?? "";
        this.age = age ?? 0;
        this.phone = phone ?? "";
    }
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName(): string {
    const firstNames = ["John", "Jane", "Alex", "Emily", "Michael", "Sarah"];
    const lastNames = ["Smith", "Doe", "Brown", "Johnson", "Lee", "Taylor"];
    const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
    const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
    return `${firstName} ${lastName}`;
}

function getRandomPhone(): string {
    const areaCode = getRandomInt(100, 999);
    const prefix = getRandomInt(100, 999);
    const lineNumber = getRandomInt(1000, 9999);
    return `${areaCode}-${prefix}-${lineNumber}`;
}

export function generateRandomUser(): User {
    const name = getRandomName();
    const age = getRandomInt(18, 100);
    const phone = getRandomPhone();
    return new User(name, age, phone);
}