// src/types.ts
export interface User {
    id: number;
    name: string;
    age: number;
    phone: string;
    constructor(data?: Partial<User>) {
        Object.assign(this, data)
    }
}
