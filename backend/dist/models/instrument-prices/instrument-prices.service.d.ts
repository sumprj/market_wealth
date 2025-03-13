import { Repository } from 'typeorm';
import { InstrumentPrice } from './instrument-price.entity';
import { Instrument } from '../instruments/instrument.entity';
import { InstrumentPriceDto } from './dto/instrument-price.dto';
export declare class InstrumentPricesService {
    private readonly priceRepo;
    private readonly instrumentRepo;
    constructor(priceRepo: Repository<InstrumentPrice>, instrumentRepo: Repository<Instrument>);
    savePrices(priceData: InstrumentPriceDto[]): Promise<void>;
}
