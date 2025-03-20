import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { InstrumentPrice } from '../instrument-prices/instrument-price.entity';
import { TechnicalDetail } from '../instrument-prices/technical-detail.entity';
import { GlobalEntity } from '../global/global.entity';
import { DayPrice } from '../instrument-prices/day-price.entity';

@Entity()
export class Instrument extends GlobalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  symbol: string;

  @OneToMany(() => InstrumentPrice, (price) => price.instrument)
  prices: InstrumentPrice[];

  @OneToOne(() => DayPrice, (price) => price.instrument)
  dayPrice: DayPrice;

  @OneToMany(() => TechnicalDetail, (detail) => detail.instrument)
  technicalDetails: TechnicalDetail[];
}
