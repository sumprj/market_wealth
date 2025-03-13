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
exports.InstrumentPricesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const instrument_price_entity_1 = require("./instrument-price.entity");
const instrument_entity_1 = require("../instruments/instrument.entity");
let InstrumentPricesService = class InstrumentPricesService {
    constructor(priceRepo, instrumentRepo) {
        this.priceRepo = priceRepo;
        this.instrumentRepo = instrumentRepo;
    }
    async savePrices(priceData) {
        for (const item of priceData) {
            let instrument = await this.instrumentRepo.findOne({ where: { symbol: item.symbol } });
            if (!instrument) {
                instrument = this.instrumentRepo.create({ name: item.symbol, symbol: item.symbol });
                await this.instrumentRepo.save(instrument);
            }
            const price = this.priceRepo.create({
                instrument,
                datetime: item.datetime || new Date(),
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close,
                current_price: item.current_price || item.close,
            });
            await this.priceRepo.save(price);
        }
    }
};
exports.InstrumentPricesService = InstrumentPricesService;
exports.InstrumentPricesService = InstrumentPricesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(instrument_price_entity_1.InstrumentPrice)),
    __param(1, (0, typeorm_1.InjectRepository)(instrument_entity_1.Instrument)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InstrumentPricesService);
//# sourceMappingURL=instrument-prices.service.js.map