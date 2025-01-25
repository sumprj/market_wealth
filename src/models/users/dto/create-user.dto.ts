import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsDate, IsNumber, MinLength, IsAlphanumeric, IsOptional } from 'class-validator';


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsAlphanumeric()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsDate()
    @Type(() => Date) // This will convert the value into a Date instance
    birthDate: Date;

    @IsNumber()
    @IsOptional()
    salary?: number;
}