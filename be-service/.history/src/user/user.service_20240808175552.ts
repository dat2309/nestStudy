import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SortBy } from 'src/global/userEnum';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateRandomUser, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.initializeUsers();
  }

  // Initialize with random users
  private async initializeUsers() {
    const existingUsers = await this.userRepository.find();
    if (existingUsers.length === 0) {
      for (let i = 0; i < 10; i++) {  // Generate 10 random users
        const randomUser = generateRandomUser();
        await this.userRepository.save(randomUser);
      }
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }


  async findAll(sortBy?: string): Promise<User[]> {
    const sortByEnum = this.convertNumericSortBy(Number(sortBy));
    console.log(sortBy)

    const options: FindManyOptions<User> = {};

    if (sortByEnum) {
      options.order = {
        [sortByEnum]: 'ASC'
      };
    }
    return await this.userRepository.find(options);
  }

  private convertNumericSortBy(sortBy: number): SortBy | null {
    switch (sortBy) {
      case 0:
        return SortBy.ID;
      case 1:
        return SortBy.NAME;
      case 2:
        return SortBy.AGE;
      case 3:
        return SortBy.PHONE;
      default:
        return null;
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.createQueryBuilder().update(User).set(updateUserDto).where('id = :id', { id }).execute(
     
  }

  async remove(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} removed successfully`;
  }
}