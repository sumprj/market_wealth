import { BaseEntity } from 'typeorm';
export declare class GlobalEntity extends BaseEntity {
    id: number;
    isActive: boolean;
    lastModifiedDate: Date;
    createdDate: Date;
}
