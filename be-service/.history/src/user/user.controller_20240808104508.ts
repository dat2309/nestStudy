import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponseData } from 'src/global/responseClass';
import { HttpMessage, HttpStatus } from 'src/global/responseEnum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    tr
    return this.userService.create(createUserDto);
  }

  @Get()
  getUsers(): ResponseData<string> {
    return new ResponseData<string>(this.userService.findAll(), HttpStatus.OK, HttpMessage.OK);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
