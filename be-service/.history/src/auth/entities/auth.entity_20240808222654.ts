@PrimaryGeneratedColumn()
id: number;

@Column({ unique: true })
username: string;

@Column()
password: string;  // This should be hashed
