import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { InstrumentPrice } from '../instrument-prices/instrument-price.entity';
import { GlobalEntity } from '../global/global.entity';

@Entity()
export class Instrument extends GlobalEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  symbol: string;

  @OneToMany(() => InstrumentPrice, (price) => price.instrument)
  prices: InstrumentPrice[];
}
