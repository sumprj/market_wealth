import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';

@Entity({ synchronize: false })
export class GlobalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'tinyint',
    name: 'is_active',
    default: true
  })
  isActive: boolean;

  @Column({ 
    type: 'timestamp', 
    name: 'last_modified_date',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  lastModifiedDate: Date;

  @Column({ 
    type: 'timestamp', 
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;
}
