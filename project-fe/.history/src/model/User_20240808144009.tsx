// src/types.ts
export class User {
    id?: number; // id is now optional
    name: string;
    age: number;
    phone: string;

    constructor(data?: Partial<User>) {
        this.name = data?.name || ""; // Default to empty string if not provided
        this.age = data?.age || 0;    // Default to 0 if not provided
        this.phone = data?.phone || ""; // Default to empty string if not provided
        this.id = data?.id; // id may or may not be provided
    }
}
