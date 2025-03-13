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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentPricesController = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const instrument_prices_service_1 = require("./instrument-prices.service");
const papaparse_1 = require("papaparse");
let InstrumentPricesController = class InstrumentPricesController {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    async uploadFile(file) {
        const csvData = file.buffer.toString('utf-8');
        const { data } = (0, papaparse_1.parse)(csvData, { header: true, skipEmptyLines: true });
        console.log(data);
        return 'File uploaded and prices saved';
    }
};
exports.InstrumentPricesController = InstrumentPricesController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_1.Multer !== "undefined" && multer_1.Multer.File) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], InstrumentPricesController.prototype, "uploadFile", null);
exports.InstrumentPricesController = InstrumentPricesController = __decorate([
    (0, common_1.Controller)('instrument-prices'),
    __metadata("design:paramtypes", [instrument_prices_service_1.InstrumentPricesService])
], InstrumentPricesController);
//# sourceMappingURL=instrument-price.controller.js.map