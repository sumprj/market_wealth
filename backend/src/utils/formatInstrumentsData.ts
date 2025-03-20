import { InstrumentPriceDto } from '../models/instrument-prices/dto/instrument-price.dto';  

export function formatInstrumentData(rawData: any[], date: Date): any[] {
    return rawData.map((item) => {
      return {
        symbol: item['SYMBOL \n']?.trim(),
        open: parseFloat(item['OPEN \n']?.replace(/,/g, '')) || null,
        high: parseFloat(item['HIGH \n']?.replace(/,/g, '')) || null,
        low: parseFloat(item['LOW \n']?.replace(/,/g, '')) || null,
        close: parseFloat(item['LTP \n']?.replace(/,/g, '')) || null,
        current_price: parseFloat(item['LTP \n']?.replace(/,/g, '')) || null,
        volume: parseInt(item['VOLUME \n(shares)']?.replace(/,/g, '')) || null,
        value_in_crores: parseFloat(item['VALUE \n (₹ Crores)']?.replace(/,/g, '')) || null,
        change: parseFloat(item['CHNG \n']?.replace(/,/g, '')) || null,
        percent_change: parseFloat(item['%CHNG \n']?.replace(/,/g, '')) || null,
        week_52_high: parseFloat(item['52W H \n']?.replace(/,/g, '')) || null,
        week_52_low: parseFloat(item['52W L \n']?.replace(/,/g, '')) || null,
        month_change_percent: parseFloat(item['30 D   %CHNG \n']?.replace(/,/g, '')) || null,
        year_change_percent: parseFloat(item['365 D % CHNG \n 11-Mar-2024']?.replace(/,/g, '')) || null,
        date: new Date(date)
      };
    });
  }
  