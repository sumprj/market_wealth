import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentPricesController } from './instrument-price.controller';
import { InstrumentPricesService } from './instrument-prices.service';
import { InstrumentPrice } from './instrument-price.entity';
import { Instrument } from '../instruments/instrument.entity';
import { InstrumentModule } from '../instruments/instrument.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstrumentPrice]),
    InstrumentModule, // Import the InstrumentModule
  ],
  controllers: [InstrumentPricesController],
  providers: [InstrumentPricesService],
  exports: [TypeOrmModule],
})
export class InstrumentPricesModule {}
