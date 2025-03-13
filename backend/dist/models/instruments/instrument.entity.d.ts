import { InstrumentPrice } from '../instrument-prices/instrument-price.entity';
import { GlobalEntity } from '../global/global.entity';
export declare class Instrument extends GlobalEntity {
    id: number;
    name: string;
    symbol: string;
    prices: InstrumentPrice[];
}
