import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {hashPassword} from '../authentication/access-token';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.gender = createUserDto.gender;
    user.birthDate = createUserDto.birthDate;
    user.salary = createUserDto.salary;
    user.lastLogin = null;
    user.username = createUserDto.username;
    user.password = hashPassword(createUserDto.password);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}


