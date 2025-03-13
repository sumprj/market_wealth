import { Instrument } from '../instruments/instrument.entity';
import { GlobalEntity } from '../global/global.entity';
export declare class InstrumentPrice extends GlobalEntity {
    id: number;
    instrument: Instrument;
    datetime: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    current_price: number;
}
