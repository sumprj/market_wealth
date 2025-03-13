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
exports.GlobalEntity = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let GlobalEntity = class GlobalEntity extends typeorm_2.BaseEntity {
};
exports.GlobalEntity = GlobalEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GlobalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'is_active',
        default: true
    }),
    __metadata("design:type", Boolean)
], GlobalEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'last_modified_date',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], GlobalEntity.prototype, "lastModifiedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'created_date',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], GlobalEntity.prototype, "createdDate", void 0);
exports.GlobalEntity = GlobalEntity = __decorate([
    (0, typeorm_1.Entity)({ synchronize: false })
], GlobalEntity);
//# sourceMappingURL=global.entity.js.map