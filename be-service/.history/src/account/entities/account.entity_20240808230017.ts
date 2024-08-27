// src/account/entities/account.entity.ts
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum UserRole {
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
}

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    accountName: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
