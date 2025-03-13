import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsDate, IsNumber, MinLength, isNumber, IsAlphanumeric, IsOptional } from 'class-validator';

export class UpdateUserDto {
@IsString()
    @IsNotEmpty()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @IsString()
    @MinLength(6)
    @IsAlphanumeric()
    @IsOptional()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    gender: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date) // This will convert the value into a Date instance
    birthDate: Date;

    @IsNumber()
    @IsOptional()
    salary?: number;
}
