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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
const global_entity_1 = require("../models/global/global.entity");
const typeorm_1 = require("typeorm");
let AccessToken = class AccessToken extends global_entity_1.GlobalEntity {
};
exports.AccessToken = AccessToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AccessToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token', unique: true }),
    __metadata("design:type", String)
], AccessToken.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry_time', type: 'datetime' }),
    __metadata("design:type", Date)
], AccessToken.prototype, "expiryTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_logged_in', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], AccessToken.prototype, "lastLoggedIn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'generation_time', type: 'datetime' }),
    __metadata("design:type", Date)
], AccessToken.prototype, "generationTime", void 0);
exports.AccessToken = AccessToken = __decorate([
    (0, typeorm_1.Entity)('access_token')
], AccessToken);
//# sourceMappingURL=access-token.entity.js.map