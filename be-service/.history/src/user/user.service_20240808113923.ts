import { Injectable, NotFoundException } from '@nestjs/common';
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
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, age, phone } = createUserDto;
    const newUser = new User(name, age, phone);
    this.users.push(newUser);
    return newUser;
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


  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return user;
  }

  async remove(id: number): Promise<string> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1); // Remove the user from the array
    return `User with id ${id} removed successfully`;
  }
}
