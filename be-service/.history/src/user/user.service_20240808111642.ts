import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateRandomUser, User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) { // Generate 10 random users
      this.users.push(generateRandomUser());
    }
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  async findAll(): Promise<User[]> {
    // Your logic to retrieve all users from the database
    return this.users;
    // return this.userRepository.find();
  }



  findOne(id: number) {
    const user = this.users[id];
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
