import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
export enum UserRole {
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
}
export class UserResponse {
    @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
    id: number;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    name: string;

    @ApiProperty({ example: 25, description: 'The age of the user' })
    age: number;

    @ApiProperty({ example: '123-456-7890', description: 'The phone number of the user' })
    phone: string;

    @ApiProperty({ example: 'data:image/jpeg;base64,...', description: 'The avatar of the user in base64 format' })
    avatar?: string;

    role: UserRole;

}
@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    avatar: string;
    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    phone: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
    @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole;

    constructor(name?: string, age?: number, phone?: string, role?: UserRole) {
        this.name = name ?? "";
        this.age = age ?? 0;
        this.phone = phone ?? "";
        this.role = role ?? UserRole.EMPLOYEE
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