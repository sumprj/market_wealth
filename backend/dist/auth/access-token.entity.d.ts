import { GlobalEntity } from 'src/models/global/global.entity';
export declare class AccessToken extends GlobalEntity {
    id: number;
    token: string;
    expiryTime: Date;
    lastLoggedIn: Date;
    generationTime: Date;
}
