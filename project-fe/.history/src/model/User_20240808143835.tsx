// src/types.ts
export class User {
    id: number = 0;
    name: string = "";
    age: s = "";
    phone: string = "";
    constructor(data?: Partial<User>) {
        Object.assign(this, data)
    }
}
