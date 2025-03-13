import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from './instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  exports: [TypeOrmModule],
})
export class InstrumentModule {}
