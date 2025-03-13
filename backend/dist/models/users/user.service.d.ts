import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/auth/access-token.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly accessTokenRepository;
    constructor(userRepository: Repository<User>, jwtService: JwtService, accessTokenRepository: Repository<AccessToken>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findOne(where: FindOptionsWhere<User>): Promise<User>;
    updateUser(id: number, user: UpdateUserDto): Promise<void>;
    removeUser(id: number): Promise<void>;
    validatePassword(user: User, password: string): Promise<boolean>;
    generateAuthToken(user: any): Promise<string>;
}
