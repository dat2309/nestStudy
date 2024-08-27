import { ForbiddenException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/global/jwt-auth.guard';
import { SortBy } from 'src/global/userEnum';
import { RolesGuard } from 'src/roles.guard';
import { DataSource, Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateUserDto } from './dto/create-user.dto';
import { generateRandomUser, User, UserResponse, UserRole } from './entities/user.entity';
@Injectable()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.initializeUsers();
  }

  // Initialize with random users
  private async initializeUsers() {
    const existingUsers = await this.userRepository.find();

    if (existingUsers.length === 0) {
      const user = new User("Nguyễn Thế Đạt", 24, "0989720574", UserRole.MANAGER)
      const manager = await this.userRepository.save(user);
      const accountManager = {
        accountName: `user${manager.id}`, // Assuming accountName is part of userData
        password: "0000",       // Assuming password is part of userData
        // Assuming role is part of userData
        user: manager,                   // Link the user entity
      };

      await this.accountService.createAccount(accountManager);
      for (let i = 0; i < 10; i++) {  // Generate 10 random users
        const randomUser = generateRandomUser();
        const savedUser = await this.userRepository.save(randomUser);
        const accountData = {
          accountName: `user${savedUser.id}`, // Assuming accountName is part of userData
          password: "0000",       // Assuming password is part of userData
          // Assuming role is part of userData
          user: savedUser,                   // Link the user entity
        };

        await this.accountService.createAccount(accountData);
      }
    }
  }

  async create(createUserDto: CreateUserDto, currentUserRole: UserRole): Promise<UserResponse | string> {
    // const newUser = this.userRepository.create(createUserDto);
    // return await this.userRepository.save(newUser);
    if (currentUserRole !== UserRole.MANAGER) {
      return 'Only managers can create users';
    }

    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    const accountData = {
      accountName: `user${savedUser.id}`, // Assuming accountName is part of userData
      password: "0000",       // Assuming password is part of userData
      // Assuming role is part of userData
      user: savedUser,                   // Link the user entity
    };

    await this.accountService.createAccount(accountData);

    const userResponse = {
      id: savedUser.id,
      name: savedUser.name,
      age: savedUser.age,
      phone: savedUser.phone,
      avatar: user.avatar ? user.avatar.toString('base64') : null,
      role: savedUser.role
    }
    return userResponse;
  }


  async findAll(keySearch?: string, sortBy?: string): Promise<UserResponse[]> {
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


    if (keySearch) {
      query = query.where("LOWER(user.name) ILIKE LOWER(:keySearch)", { keySearch: `%${keySearch}%` });
    }

    // Apply sorting if sortBy is provided
    if (sortBy) {
      query = query.orderBy(`${sortByEnum}`, 'ASC');
    }
    const users = await query.getMany();

    // Map users to UserResponse format
    const userResponses: UserResponse[] = users.map(user => ({
      id: user.id,
      name: user.name,
      age: user.age,
      phone: user.phone,
      avatar: user.avatar ? user.avatar.toString('base64') : null,// Convert avatar to base64 if needed,
      role: user.role
    }));

    return userResponses;

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

  async findOne(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const userResponse = {
      id: user.id,
      name: user.name,
      age: user.age,
      phone: user.phone,
      avatar: user.avatar ? user.avatar.toString('base64') : null,
      role: user.role
    }
    return userResponse;
  }


  async update(id: number, updateUserDto: CreateUserDto, currentUser: User): Promise<UserResponse | string> {
    if (currentUser.role !== UserRole.MANAGER && id !== currentUser.id) {
      throw new ForbiddenException('You no have permission to update this user');
    }

    const result = await this.userRepository.createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();

    // Check if any rows were affected
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }


    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const userResponse = {
      id: user.id,
      name: user.name,
      age: user.age,
      phone: user.phone,
      avatar: user.avatar ? user.avatar.toString('base64') : null,
      role: user.role
    }
    return userResponse;
  }

  async remove(id: number, currentUserRole: any): Promise<string> {
    console.log("--------")
    console.log(id)
    console.log(currentUserRole)
    if (currentUserRole !== UserRole.MANAGER) {
      throw new ForbiddenException('Only managers can remove users');
    }
    await this.accountService.removeAccount(id);

    const result = await this.userRepository.delete(id);
    console.log(currentUserRole)
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} removed successfully`;
  }
  async uploadAvatar(userId: number, avatar:string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    user.avatar =avatar; // Store file buffer

    const savedUser = await this.userRepository.save(user);;

    const userResponse = {
      id: savedUser.id,
      name: savedUser.name,
      age: savedUser.age,
      phone: savedUser.phone,
      avatar: savedUser.avatar,
      role: savedUser.role
    }
    return userResponse;

  }
}      // If no rows were affected, throw an exception

