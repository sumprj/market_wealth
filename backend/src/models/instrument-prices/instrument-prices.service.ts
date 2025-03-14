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
    private readonly price_repo: Repository<InstrumentPrice>,

    @InjectRepository(Instrument)
    private readonly instrument_repo: Repository<Instrument>,
  ) {}

  async savePrices(price_data: InstrumentPriceDto[]): Promise<void> {
    for (const item of price_data) {
      let instrument = await this.instrument_repo.findOne({ where: { symbol: item.symbol } });
      if (!instrument) {
        console.log('Creating new instrument:', item);
        instrument = this.instrument_repo.create({ name: item.symbol, symbol: item.symbol });
        await this.instrument_repo.save(instrument);
      }

      await this.price_repo.upsert(
        {
          instrument,
          date: item.date,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          currentPrice: item.current_price || item.close,
        },
        {
          
          conflictPaths: ['instrument', 'date'],
          skipUpdateIfNoValuesChanged: true, // Avoid unnecessary updates
        }
      );
    }
  }
}
