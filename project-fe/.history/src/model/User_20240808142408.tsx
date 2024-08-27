// src/types.ts
export class User {
    id: number = 0;
    name: string = "";
    age: number = 0;
    phone: string = "";
    constructor(data?: Partial<User>) {
        Object.assign(this, data)
    }
}
