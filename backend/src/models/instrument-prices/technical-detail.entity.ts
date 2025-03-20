import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Instrument } from '../instruments/instrument.entity';
import { GlobalEntity } from '../global/global.entity';

@Entity()
export class TechnicalDetail extends GlobalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timeframe: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ema5close: number;

  @ManyToOne(() => Instrument, (instrument) => instrument.technicalDetails, { onDelete: 'CASCADE' })
  instrument: Instrument;
}
