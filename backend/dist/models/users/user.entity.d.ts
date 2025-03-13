import { GlobalEntity } from '../global/global.entity';
export declare class User extends GlobalEntity {
    username: string;
    password: string;
    name: string;
    email: string;
    gender: string;
    birthDate: Date;
    salary: number;
    lastLogin: Date;
}
