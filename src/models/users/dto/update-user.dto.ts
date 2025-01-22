import { IsString, IsEmail, IsNotEmpty, IsDate, IsNumber, MinLength, isNumber, IsAlphanumeric } from 'class-validator';

export class UpdateUserDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;

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
    name: string;

    @IsString()
    gender: string;

    @IsDate()
    birthDate: Date;

    @IsNumber()
    salary: number;
}