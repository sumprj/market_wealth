import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentPrice } from './instrument-price.entity';
import { Instrument } from '../instruments/instrument.entity';
import { InstrumentPriceDto } from './dto/instrument-price.dto';

@Injectable()
export class InstrumentPricesService {
  constructor(
    @InjectRepository(InstrumentPrice)
    private readonly priceRepo: Repository<InstrumentPrice>,

    @InjectRepository(Instrument)
    private readonly instrumentRepo: Repository<Instrument>,
  ) {}

  async savePrices(priceData: InstrumentPriceDto[], date: Date): Promise<void> {
    for (const item of priceData) {
      let instrument = await this.instrumentRepo.findOne({ where: { symbol: item.symbol } });
      if (!instrument) {
        console.log('Creating new instrument:', item);
        instrument = this.instrumentRepo.create({ name: item.symbol, symbol: item.symbol });
        await this.instrumentRepo.save(instrument);
      }

      if(!date) {
        throw new Error('Date is required');
      }
      const price = this.priceRepo.create({
        instrument,
        date: date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        currentPrice: item.current_price || item.close,
      });
      await this.priceRepo.save(price);
    }
  }
}
