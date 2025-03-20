import { Controller, Get, Query } from '@nestjs/common';
import { TechnicalDetailService } from './technical-detail.service';

@Controller('technical-details')
export class TechnicalDetailController {
  constructor(private readonly technicalDetailService: TechnicalDetailService) {}

  @Get('calculate5EMA')
  async calculate5EMA(@Query('timeframe') timeframe: string) {
    return this.technicalDetailService.calculate5EMA(timeframe);
  }

  @Get('listOfStocksWithInsideCandles')
  async getListOfStocksWithInsideCandles(@Query('timeframe') timeframe: string) {
    return this.technicalDetailService.getListOfInstrumentsWithInsideCandle(timeframe);
  }

  @Get('gapBuySellRecommendation')
  async getGapBuySellRecommendation(@Query('timeframe') timeframe: string) {
    return this.technicalDetailService.getGapBuySellRecommendation();
  }
}
