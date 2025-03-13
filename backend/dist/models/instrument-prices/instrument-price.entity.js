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
exports.InstrumentPrice = void 0;
const typeorm_1 = require("typeorm");
const instrument_entity_1 = require("../instruments/instrument.entity");
const global_entity_1 = require("../global/global.entity");
let InstrumentPrice = class InstrumentPrice extends global_entity_1.GlobalEntity {
};
exports.InstrumentPrice = InstrumentPrice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InstrumentPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instrument_entity_1.Instrument, (instrument) => instrument.prices, { onDelete: 'CASCADE' }),
    __metadata("design:type", instrument_entity_1.Instrument)
], InstrumentPrice.prototype, "instrument", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], InstrumentPrice.prototype, "datetime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InstrumentPrice.prototype, "open", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InstrumentPrice.prototype, "high", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InstrumentPrice.prototype, "low", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InstrumentPrice.prototype, "close", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InstrumentPrice.prototype, "current_price", void 0);
exports.InstrumentPrice = InstrumentPrice = __decorate([
    (0, typeorm_1.Entity)()
], InstrumentPrice);
//# sourceMappingURL=instrument-price.entity.js.map