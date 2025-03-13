import { Multer } from 'multer';
import { InstrumentPricesService } from './instrument-prices.service';
export declare class InstrumentPricesController {
    private readonly pricesService;
    constructor(pricesService: InstrumentPricesService);
    uploadFile(file: Multer.File): Promise<string>;
}
