import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentPrice } from './instrument-price.entity';
import { Instrument } from '../instruments/instrument.entity';
import { InstrumentPriceDto } from './dto/instrument-price.dto';
import { DayPrice } from './day-price.entity';

@Injectable()
export class InstrumentPricesService {
  constructor(
    @InjectRepository(InstrumentPrice)
    private readonly priceRepo: Repository<InstrumentPrice>,

    @InjectRepository(DayPrice)
    private readonly dayPriceRepo: Repository<InstrumentPrice>,

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

      await this.priceRepo.upsert(
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

  async saveDayPrices(price_data: InstrumentPriceDto[]): Promise<void> {
    console.log(price_data)
    for (const item of price_data) {
      let instrument = await this.instrument_repo.findOne({ where: { symbol: item.symbol } });
      if (!instrument) {
        continue;
        console.log('Creating new instrument:', item);
        instrument = this.instrument_repo.create({ name: item.symbol, symbol: item.symbol });
        await this.instrument_repo.save(instrument);
      }

      let instrumentDayPrice =  await this.dayPriceRepo.findOne({where: {
        instrument: {id: instrument.id},
        date: item.date,
      }});
      if (!instrumentDayPrice) {
        instrumentDayPrice = new DayPrice();
        instrumentDayPrice.instrument = instrument;
        instrumentDayPrice.date = item.date;
      }

      instrumentDayPrice.close = item.close;
      instrumentDayPrice.currentPrice = item.current_price || item.close;
      instrumentDayPrice.high = item.high;
      instrumentDayPrice.low = item.low;
      instrumentDayPrice.open = item.open;
      
      instrumentDayPrice.save();
      // await this.dayPriceRepo.upsert(
      //   {
      //     instrument,
      //     date: item.date,
      //     open: item.open,
      //     high: item.high,
      //     low: item.low,
      //     close: item.close,
      //     currentPrice: item.current_price || item.close,
      //   },
      //   {
      //     conflictPaths: ['instrument', 'date'],
      //     skipUpdateIfNoValuesChanged: true, // Avoid unnecessary updates
      //   }
      // );
    }
  }

  async deletePricesByDate(date: Date): Promise<boolean> {
    const result = await this.priceRepo.delete({ date });
    return result.affected > 0;
  }
}
