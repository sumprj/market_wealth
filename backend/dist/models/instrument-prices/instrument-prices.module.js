"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentPricesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const instrument_price_controller_1 = require("./instrument-price.controller");
const instrument_prices_service_1 = require("./instrument-prices.service");
const instrument_price_entity_1 = require("./instrument-price.entity");
const instrument_module_1 = require("../instruments/instrument.module");
let InstrumentPricesModule = class InstrumentPricesModule {
};
exports.InstrumentPricesModule = InstrumentPricesModule;
exports.InstrumentPricesModule = InstrumentPricesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([instrument_price_entity_1.InstrumentPrice]),
            instrument_module_1.InstrumentModule,
        ],
        controllers: [instrument_price_controller_1.InstrumentPricesController],
        providers: [instrument_prices_service_1.InstrumentPricesService],
        exports: [typeorm_1.TypeOrmModule],
    })
], InstrumentPricesModule);
//# sourceMappingURL=instrument-prices.module.js.map