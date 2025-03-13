"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const access_token_1 = require("../../auth/access-token");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const access_token_entity_1 = require("../../auth/access-token.entity");
const tokenExpiryTime = 1;
let UserService = class UserService {
    constructor(userRepository, jwtService, accessTokenRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.accessTokenRepository = accessTokenRepository;
    }
    async createUser(createUserDto) {
        const user = new user_entity_1.User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.gender = createUserDto.gender;
        user.birthDate = createUserDto.birthDate;
        user.salary = createUserDto.salary;
        user.lastLogin = null;
        user.username = createUserDto.username;
        user.password = (0, access_token_1.hashPassword)(createUserDto.password);
        const existingEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existingEmail) {
            console.log('Existing Email Error thrown');
            throw new common_1.BadRequestException('Email already exists');
        }
        const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
        if (existingUser) {
            throw new common_1.BadRequestException('Username already exists');
        }
        const userSavedData = await this.userRepository.save(user);
        delete userSavedData.password;
        return userSavedData;
    }
    async findAll() {
        return this.userRepository.find();
    }
    async findById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findOne(where) {
        return this.userRepository.findOne({ where });
    }
    async updateUser(id, user) {
        await this.userRepository.update(id, user);
    }
    async removeUser(id) {
        await this.userRepository.delete(id);
    }
    async validatePassword(user, password) {
        console.log('COmpare Password: ', user, password);
        return (0, bcrypt_1.compare)(password, user.password);
    }
    async generateAuthToken(user) {
        const payload = { username: user.username, email: user.email };
        const token = this.jwtService.sign(payload);
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + tokenExpiryTime);
        const accessToken = new access_token_entity_1.AccessToken();
        accessToken.token = token;
        accessToken.expiryTime = expiryTime;
        accessToken.lastLoggedIn = new Date();
        await this.accessTokenRepository.save(accessToken);
        return token;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(access_token_entity_1.AccessToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map