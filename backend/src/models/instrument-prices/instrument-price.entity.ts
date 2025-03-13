import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Instrument } from '../instruments/instrument.entity';
import { GlobalEntity } from '../global/global.entity';

@Entity()
export class InstrumentPrice extends GlobalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instrument, (instrument) => instrument.prices, { onDelete: 'CASCADE' })
  instrument: Instrument;

  @Column({ type: 'date' }) // Stores only the date
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  open: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  high: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  low: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  close: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  currentPrice: number; // Renamed to camelCase
}
