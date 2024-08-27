import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/global/jwt-auth.guard';
import { SortBy } from 'src/global/userEnum';
import { RolesGuard } from 'src/roles.guard';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateRandomUser, User } from './entities/user.entity';
@Injectable()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountService,
  ) {
    this.initializeUsers();
  }

  // Initialize with random users
  private async initializeUsers() {
    const existingUsers = await this.userRepository.find();
  
    if (existingUsers.length === 0) {
      const user = new User("Nguyễn Thế Đạt",24,"0989720574")
      for (let i = 0; i < 10; i++) {  // Generate 10 random users
        const randomUser = generateRandomUser();
        const savedUser = await this.userRepository.save(randomUser);
        const accountData = {
          accountName: "user" + savedUser.id, // Assuming accountName is part of userData
          password: "0000",       // Assuming password is part of userData
          // Assuming role is part of userData
          user: savedUser,                   // Link the user entity
        };

        await this.accountService.createAccount(accountData);
      }
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // const newUser = this.userRepository.create(createUserDto);
    // return await this.userRepository.save(newUser);

    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    const accountData = {
      accountName: "user" + savedUser.id, // Assuming accountName is part of userData
      password: "0000",       // Assuming password is part of userData
      // Assuming role is part of userData
      user: savedUser,                   // Link the user entity
    };

    await this.accountService.createAccount(accountData);

    return savedUser;
  }


  async findAll(keySearch?: string, sortBy?: string): Promise<User[]> {
    const sortByEnum = this.convertNumericSortBy(Number(sortBy));
    console.log(sortBy)

    // const options: FindManyOptions<User> = {};

    // if (sortByEnum) {
    //   options.order = {
    //     [sortByEnum]: 'ASC'
    //   };
    // }
    // return await this.userRepository.find(options);

    let query = this.userRepository.createQueryBuilder("user");

    // If keySearch is not empty, add a WHERE clause to filter by name
    if (keySearch) {
      query = query.where("LOWER(user.name) ILIKE LOWER(:keySearch)", { keySearch: `%${keySearch}%` });
    }

    // Apply sorting if sortBy is provided
    if (sortBy) {
      query = query.orderBy(`${sortByEnum}`, 'ASC');
    }
    return query.getMany()

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
        return SortBy.CREATE_AT;
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
    const result = await this.userRepository.createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();

    // Check if any rows were affected
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Step 2: Retrieve and return the updated user
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} removed successfully`;
  }

}      // If no rows were affected, throw an exception

// Return a success message
