import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {hashPassword} from '../../auth/access-token';
import { ValidationError } from 'class-validator';
import { SignInDto } from 'src/models/users/dto/sign-in.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  // Import JwtService
import { AccessToken } from 'src/auth/access-token.entity';
const tokenExpiryTime = 1; // time in hour

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,  // Inject JwtService
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository: Repository<AccessToken>,
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
    
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  
  async findOne(where: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOne({ where });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Validate the provided password
  async validatePassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);  // compare password with hashed value in DB
  }


  async generateAuthToken(user: any): Promise<string> {
    const payload = { username: user.username, email: user.email };
    const token = this.jwtService.sign(payload);

    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + tokenExpiryTime); // Set token expiry to 1 hour

    const accessToken = new AccessToken();
    accessToken.token = token;
    accessToken.expiryTime = expiryTime;
    accessToken.lastLoggedIn = new Date();
    await this.accessTokenRepository.save(accessToken); // Save token in database

    return token;
  }
}


