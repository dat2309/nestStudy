import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ResponseData } from 'src/global/responseClass';
import { HttpMessage, HttpStatus } from 'src/global/responseEnum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseData<User | string>> {
    if (createUserDto && createUserDto['status'] === 400) {
      // Handle validation error case
      return new ResponseData<string>(null, HttpStatus.BAD_REQUEST, createUserDto['message']);
    } else {
      try {
        return new ResponseData<User>(await this.userService.create(createUserDto), HttpStatus.OK, HttpMessage.OK);
      } catch (error) {
        return new ResponseData<string>("Failed to create user", HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
      }
    }



  }

  @Get()
  async getUsers(
    @Query('sort_by') sortBy?: string,
  ): Promise<ResponseData<User[]>> {
    try {
      return new ResponseData<User[]>(await this.userService.findAll(sortBy), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<User[]>([], HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }

  @Get(':id/detail')
  async getUser(@Param('id') id: string): Promise<ResponseData<User>> {
    try {
      return new ResponseData<User>(await this.userService.findOne(+id), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<User>(new User(), HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }

  @Post(':id/update')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ResponseData<User | string>> {
    try {
      return new ResponseData<User>(await this.userService.update(+id, updateUserDto), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<string>("Failed to update user", HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }

  @Post('remove')
  async removeUser(@Body('id') id: string): Promise<ResponseData<string>> {
    try {
      return new ResponseData<string>(await this.userService.remove(+id), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<string>("Failed to remove user", HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }

  @Get('search')
  async searchUser(
    @Query('key_search') keySearch: string,
    @Query('sort_by') sortBy?: string,
  ): Promise<ResponseData<User[]>> {
    try {
      return new ResponseData<User[]>(await this.userService.search(sortBy), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<User[]>([], HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }
}
