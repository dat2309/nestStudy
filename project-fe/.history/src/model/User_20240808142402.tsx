// src/types.ts
export class User {
    id: number =0;
    name: string ="";
    age: number="";
    phone: strin;
    constructor(data?: Partial<User>) {
        Object.assign(this, data)
    }
}
