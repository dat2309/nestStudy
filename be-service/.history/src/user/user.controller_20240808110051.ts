import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return new ResponseData<string>(this.userService.create(createUserDto), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<string>("Failed to create user", HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }

  @Get()
  async getUsers(): Promise<ResponseData<User[]>> {
    try {
      return new ResponseData<User[]>(await this.userService.findAll(), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<User[]>([], HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    try {
      return new ResponseData<User[]>(this.userService.findOne(+id), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<User[]>([], HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }

  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
