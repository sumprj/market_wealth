"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const access_token_entity_1 = require("../../auth/access-token.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, access_token_entity_1.AccessToken]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forRoot({
                        envFilePath: '.env',
                    })],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map