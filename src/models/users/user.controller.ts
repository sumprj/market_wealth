import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //@TODO Add all controllers for REST API

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('Created User')
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }
}
