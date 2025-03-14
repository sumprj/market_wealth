import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Instrument } from '../instruments/instrument.entity';
import { GlobalEntity } from '../global/global.entity';

@Entity()
@Unique(['instrument', 'date'])
export class InstrumentPrice extends GlobalEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Instrument, (instrument) => instrument.prices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_id_instrument' }) // Set custom foreign key name
  instrument: Instrument;
  

  @Column({ type: 'date', name: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'open' })
  open: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'high' })
  high: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'low' })
  low: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'close' })
  close: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'current_price' })
  currentPrice: number;
}
