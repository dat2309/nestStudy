// src/account/entities/account.entity.ts
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';



@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    accountName: string;

    @Column()
    password: string;


    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ type: 'varchar', length: 500, nullable: true })
    token: string; // Field to store JWT token
    @Column()
    tokenVersion: number = 0
}
