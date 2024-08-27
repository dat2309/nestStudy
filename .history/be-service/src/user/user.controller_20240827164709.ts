import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { HeadersInterceptor } from 'src/global/headers.interceptor';
import { JwtAuthGuard } from 'src/global/jwt-auth.guard';
import { ResponseData } from 'src/global/responseClass';
import { HttpStatus } from 'src/global/responseEnum';
import { RolesGuard } from 'src/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { IdDto } from './dto/id.dto';
import { UserResponse } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(HeadersInterceptor)

export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully created',
    type: UserResponse,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req
  ): Promise<ResponseData<UserResponse | string>> {
    if (createUserDto && createUserDto['status'] === 400) {
      return new ResponseData<string>(null, HttpStatus.BAD_REQUEST, createUserDto['message']);
    } else {
      try {
        return new ResponseData<UserResponse | string>(await this.userService.create(createUserDto, req.user.user.role), HttpStatus.OK, 'User created successfully');
      } catch (error) {
        if (error.status === HttpStatus.FORBIDDEN) {
          return new ResponseData<string>(error.message, HttpStatus.FORBIDDEN, 'Access denied');
        }
        return new ResponseData<string>('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of users' })
  @ApiQuery({ name: 'key_search', required: false, description: 'Search users by name', type: String })
  @ApiQuery({ name: 'sort_by', required: false, description: 'Sort users by a specific field', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of users',
    type: [UserResponse],
  })
  @Get()
  async getUsers(
    @Query('key_search') keySearch: string,
    @Query('sort_by') sortBy?: string,

  ): Promise<ResponseData<UserResponse[] | string>> {
    try {
      // Fetch users based on query parameters
      const users = await this.userService.findAll(keySearch, sortBy);
      return new ResponseData<UserResponse[]>(users, HttpStatus.OK, 'Users retrieved successfully');
    } catch (error) {
      // Handle errors and return appropriate response
      if (error.status === HttpStatus.FORBIDDEN) {
        return new ResponseData<string>(error.message, HttpStatus.FORBIDDEN, 'Access denied');
      }
      return new ResponseData<UserResponse[]>([], HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Get(':id/detail')
  @ApiOperation({ summary: 'Retrieve user details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user details',
    type: UserResponse,
  })
  async getUser(@Param('id') id: string): Promise<ResponseData<UserResponse | string>> {
    try {
      return new ResponseData<UserResponse>(await this.userService.findOne(+id), HttpStatus.OK, 'User details retrieved successfully');
    } catch (error) {
      return new ResponseData<string>('User not found', HttpStatus.NOT_FOUND, 'User not found');
    }
  }

  @Post(':id/update')
  @ApiOperation({ summary: 'Update user details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated user details',
    type: UserResponse,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
    @Req() req
  ): Promise<ResponseData<UserResponse | string>> {
    try {
      return new ResponseData<UserResponse | string>(await this.userService.update(+id, updateUserDto, req.user.user), HttpStatus.OK, 'User updated successfully');
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        return new ResponseData<string>(error.message, HttpStatus.FORBIDDEN, 'Access denied');
      }
      return new ResponseData<string>('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
  @Post('remove')
  @ApiOperation({ summary: 'Remove a user by ID' })
  @ApiBody({
    description: 'The ID of the user to be removed',
    type: IdDto, // or Number, depending on your ID type
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the user',
  })
  async removeUser(
    @Body() idDto: IdDto,
    @Req() req
  ): Promise<ResponseData<string>> {
    const { id } = idDto;
    try {
      return new ResponseData<string>(await this.userService.remove(+id, req.user.user.role), HttpStatus.OK, 'User removed successfully');
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        return new ResponseData<string>(error.message, HttpStatus.FORBIDDEN, 'Access denied');
      }
      if (error.status === HttpStatus.NOT_FOUND) {
        return new ResponseData<string>(error.message, HttpStatus.NOT_FOUND, 'User not found');
      }
      return new ResponseData<string>('Failed to remove user', HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Post(':id/upload-avatar')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the key in the form-data
  @ApiOperation({ summary: 'Upload an avatar for a user' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the user' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The file to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(
    @Param('id') userId: number,
    @Body() avatar: string,
  ): Promise<ResponseData<UserResponse | string>> {
 
    try {
      console.log(file)
      return new ResponseData<UserResponse>(await this.userService.uploadAvatar(userId, avatar), HttpStatus.OK, 'Avatar uploaded successfully');
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        return new ResponseData<string>(error.message, HttpStatus.FORBIDDEN, 'Access denied');
      }
      if (error.status === HttpStatus.NOT_FOUND) {
        return new ResponseData<string>(error.message, HttpStatus.NOT_FOUND, 'User not found');
      }
      return new ResponseData<string>('Failed to upload avatar', HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}
