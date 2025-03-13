import { GlobalEntity } from 'src/models/global/global.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('access_token')
export class AccessToken extends GlobalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'token', unique: true })
  token: string;

  @Column({ name: 'expiry_time', type: 'datetime' })
  expiryTime: Date;

  @Column({ name: 'last_logged_in', type: 'datetime', nullable: true })
  lastLoggedIn: Date;

  @CreateDateColumn({ name: 'generation_time', type: 'datetime' })
  generationTime: Date;
}
