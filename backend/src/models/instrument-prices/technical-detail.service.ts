import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnicalDetail } from './technical-detail.entity';
import { Instrument } from '../instruments/instrument.entity';
import { InstrumentPrice } from '../instrument-prices/instrument-price.entity';
import { DayPrice } from './day-price.entity';

@Injectable()
export class TechnicalDetailService {
  constructor(
    @InjectRepository(TechnicalDetail)
    private readonly technicalDetailRepository: Repository<TechnicalDetail>,

    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,

    @InjectRepository(InstrumentPrice)
    private readonly instrumentPriceRepository: Repository<InstrumentPrice>,

    @InjectRepository(DayPrice)
    private readonly dayPriceRepository: Repository<DayPrice>,
  ) { }

  async calculate5EMA(timeframe: string) {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    const instruments = await this.instrumentRepository.find();
    const results = [];

    for (const instrument of instruments) {
      // Fetch last 5 closing prices ordered by date (latest first)
      const prices = await this.instrumentPriceRepository.find({
        where: { instrument: { id: instrument.id } },
        order: { date: 'DESC' },
        take: 5,
      });

      if (prices.length < 5) {
        continue;
      }

      // Calculate 5 EMA using the standard EMA formula
      const k = 2 / (5 + 1);
      let ema = prices[0].close; // Use the most recent closing price as the starting point

      for (let i = 1; i < prices.length; i++) {
        ema = prices[i].close * k + ema * (1 - k);
      }

      // Save or update the 5 EMA in the TechnicalDetail table
      let technicalDetail = await this.technicalDetailRepository.findOne({
        where: { instrument: { id: instrument.id }, timeframe },
      });

      if (technicalDetail) {
        technicalDetail.ema5close = ema;
      } else {
        technicalDetail = this.technicalDetailRepository.create({
          instrument,
          timeframe,
          ema5close: ema,
        });
      }

      await this.technicalDetailRepository.save(technicalDetail);
      results.push({ instrumentId: instrument.id, ema });
    }

    return { message: '5 EMA calculated successfully', data: results };
  }

  async getListOfInstrumentsWithInsideCandle(timeframe: string) {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    if (timeframe === 'D') {
      const instruments = await this.instrumentRepository.find();
      const results = [];

      for (const instrument of instruments) {
        const condition = await this.isInsideCandle(timeframe, instrument.id)
        if (condition) {
          results.push(instrument);
        }
      }

      return { message: 'Inside candle list retrieved successfully', data: results };
    }
  }

  async isInsideCandle(timeframe:string, instrumentId: number) {
    try {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    const instrument = await this.instrumentRepository.findOne({where: {id: instrumentId}});
    if (!instrument) {
      throw new Error('Instrument not found');
    }

    // Fetch last 2 closing prices ordered by date (latest first)
    const prices = await this.instrumentPriceRepository.find({
      where: { instrument: { id: instrument.id } },
      order: { date: 'DESC' },
      take: 2,
    });

    if (prices.length < 2) {
      throw new Error('Not enough prices available');
    }
    const condition = prices[0].high < prices[1].high && prices[0].low > prices[1].low;
    console.log(condition, '<--', instrument.name);
    return condition;
  }catch(err) {
      return false;
    }
  }

  async getListOfInstruments5EmaAboveHigh(timeframe: string) {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    
    const instruments = await this.instrumentRepository.find();
    const results = [];

    for (const instrument of instruments) {
      // Fetch last 2 closing prices ordered by date (latest first)
      if (this.isInstruments5EmaAboveHigh(timeframe, instrument.id)) {
        results.push(instrument);
      }
    }

    return { message: 'Below 5 EMA list retrieved successfully', data: results };
  }

  async isInstruments5EmaAboveHigh(timeframe: string, instrumentId:number) {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    const instrument = await this.instrumentRepository.findOne({where: {id: instrumentId}});
    if (!instrument) {
      throw new Error('Instrument not found');
    }

    // Fetch last 2 closing prices ordered by date (latest first)
    const prices = await this.instrumentPriceRepository.find({
      where: { instrument: { id: instrument.id } },
      order: { date: 'DESC' },
      take: 2,
    });

    if (prices.length < 2) {
      throw new Error('Not enough prices available');
    }

    // Check if the latest candle is below the 5 EMA
    const technicalDetail = await this.technicalDetailRepository.findOne({
      where: { instrument: { id: instrument.id }, timeframe },
    });

    if (!technicalDetail) {
      throw new Error('5 EMA not available');
    }

    return prices[0].high > technicalDetail.ema5close;
  }

  async isInstruments5EmaBelowLow(timeframe: string, instrumentId:number) {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    const instrument = await this.instrumentRepository.findOne({where: {id: instrumentId}});
    if (!instrument) {
      throw new Error('Instrument not found');
    }

    // Fetch last 2 closing prices ordered by date (latest first)
    const prices = await this.instrumentPriceRepository.find({
      where: { instrument: { id: instrument.id } },
      order: { date: 'DESC' },
      take: 2,
    });

    if (prices.length < 2) {
      throw new Error('Not enough prices available');
    }

    // Check if the latest candle is below the 5 EMA
    const technicalDetail = await this.technicalDetailRepository.findOne({
      where: { instrument: { id: instrument.id }, timeframe },
    });

    if (!technicalDetail) {
      throw new Error('5 EMA not available');
    }

    return prices[0].low < technicalDetail.ema5close;
  }

  async getListOfInstruments5EmaBelowLow(timeframe: string) {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    const instruments = await this.instrumentRepository.find();
    const results = [];

    for (const instrument of instruments) {
      // Fetch last 2 closing prices ordered by date (latest first)
      if (this.isInstruments5EmaBelowLow(timeframe, instrument.id)) {
        results.push(instrument);
      }
    }

    return { message: 'Below 5 EMA list retrieved successfully', data: results };
  }

  async getInsideCandleStrategyForBuySell(timeframe: string) {
    if (timeframe !== 'D') {
      throw new Error('Invalid timeframe. Only "D" (daily) is supported.');
    }

    const instruments = await this.instrumentRepository.find();
    const results = {buy: [], sell: []};

    for (const instrument of instruments) {
      // Fetch last 2 closing prices ordered by date (latest first)
      if (this.isInsideCandle(timeframe, instrument.id)) {
        if (this.isInstruments5EmaAboveHigh(timeframe, instrument.id)) {
          results.sell.push(instrument);
        }
        if (this.isInstruments5EmaBelowLow(timeframe, instrument.id)) {
          results.buy.push(instrument);
        }
      }
    }

    return { message: 'Buy Sell Recommendation', data: results };
  }

  async getGapBuySellRecommendation() {
    console.log('*********************************************************************************')
    const instruments = await this.instrumentRepository.find();
    const results = {buy: [], sell: []};

    for (const instrument of instruments) {
      // Fetch last 2 closing prices ordered by date (latest first)
      try{
      const gapUp = await this.isGapUp(instrument.id);
      const gapDown = await this.isGapDown(instrument.id);
      if (gapUp) {
        console.log('Inside Gap Up', instrument.name);
        results.sell.push(instrument);
      }
      if (gapDown) {
        console.log('Inside Gap Down', instrument.name);
        results.buy.push(instrument);
      }
    } catch(err) {
      console.error('Inside Catch', err);
      continue;
    }
  }

    return { message: 'Buy Sell Recommendation', data: results };
  }

  async isGapUp(instrumentId:number) {
    const instrument = await this.instrumentRepository.findOne({where: {id: instrumentId}});
    if (!instrument) {
      throw new Error('Instrument not found');
    }

    // Fetch last 2 closing prices ordered by date (latest first)
    const prices = await this.instrumentPriceRepository.find({
      where: { instrument: { id: instrument.id } },
      order: { date: 'DESC' },
      take: 2,
    });

    const dayPrice = await this.dayPriceRepository.findOne({
      where: { instrument: { id: instrument.id } },
      order: { date: 'DESC' },
    });

    if (prices.length < 2) {
      throw new Error('Not enough prices available');
    }

    if (!dayPrice) {
      throw new Error('Day price not available');
    }

    console.log(instrument.name,prices[0].open, prices[0].close, prices[0].high, prices[0].low, dayPrice.open, prices[0].high + prices[0].close * (1+0.5/100) );

    if (prices[0].open < prices[0].close) { // Bullish candle Previous day
      // Open is above the previous high with 0.5% of the previous close
      return prices[0].high * 1.005 < dayPrice.open;
    }
    return false;
  }

  async isGapDown(instrumentId:number) {
    
    const instrument = await this.instrumentRepository.findOne({where: {id: instrumentId}});
    if (!instrument) {
      throw new Error('Instrument not found');
    }

    // Fetch last 2 closing prices ordered by date (latest first)
    const prices = await this.instrumentPriceRepository.find({
      where: { instrument: { id: instrument.id } },
      order: { date: 'DESC' },
      take: 2,
    });

    const dayPrice = await this.dayPriceRepository.findOne({
      where: { instrument: { id: instrument.id } },
      order: { date: 'DESC' },
    });

    if (prices.length < 2) {
      throw new Error('Not enough prices available');
    }

    if (!dayPrice) {
      throw new Error('Day price not available');
    }

    // return (prices[0].close * (0.97)) > dayPrice.open;
    if (prices[1].open > prices[1].close && prices[0].open > prices[0].close) { // Bearish candle Previous day
      // Open is below the previous low with 0.5% of the previous close
      return (prices[0].low * 0.998 > dayPrice.open) && (prices[0].close * (0.995)) > dayPrice.open;
    }
    return false;
  }
}
