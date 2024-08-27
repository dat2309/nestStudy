// src/types.ts
export c User {
    id: number;
    name: string;
    age: number;
    phone: string;
    constructor(data?: Partial<User>) {
        Object.assign(this, data)
    }
}
