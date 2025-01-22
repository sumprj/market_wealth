import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {GlobalEntity } from '../global/global.entity';


@Entity('user')
export class User extends GlobalEntity {
  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'birth_date', type: 'datetime' })
  birthDate: Date;

  @Column({ name: 'salary', type: 'float' })
  salary: number;

  @Column({ name: 'last_login', type: 'datetime' })
  lastLogin: Date;
}
