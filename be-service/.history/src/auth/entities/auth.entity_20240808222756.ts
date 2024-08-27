import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;  // This should be hashed
}
