import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentPricesController } from './instrument-price.controller';
import { InstrumentPricesService } from './instrument-prices.service';
import { InstrumentPrice } from './instrument-price.entity';
import { Instrument } from '../instruments/instrument.entity';
import { InstrumentModule } from '../instruments/instrument.module';
import { TechnicalDetail } from './technical-detail.entity';
import { TechnicalDetailService } from './technical-detail.service';
import { TechnicalDetailController } from './technical-detail.controller';
import { DayPrice } from './day-price.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstrumentPrice, TechnicalDetail, DayPrice]), // Add TechnicalDetail
    InstrumentModule, // Keep InstrumentModule for foreign key relation
  ],
  controllers: [InstrumentPricesController, TechnicalDetailController], // Add TechnicalDetailController
  providers: [InstrumentPricesService, TechnicalDetailService], // Add TechnicalDetailService
  exports: [TypeOrmModule],
})
export class InstrumentPricesModule {}
