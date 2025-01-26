import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ValidationError } from '../errors/validation.error'; // Import custom errors if necessary
import { SignInDto } from 'src/models/users/dto/sign-in.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      // Handle known errors here (like duplicate username, etc.)
      if (error instanceof ValidationError || error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      // Re-throw unexpected errors
      throw new BadRequestException('Invalid input data');
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userService.removeUser(id);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const { email, username, password } = signInDto;

    let user;
    if (email) {
      user = await this.userService.findOne({email});
    } else if (username) {
      user = await this.userService.findOne({username});
    }

    if (!user || !(await this.userService.validatePassword(user, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.userService.generateAuthToken(user);
  }


}
