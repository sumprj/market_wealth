import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsDate, IsNumber, MinLength, IsAlphanumeric, IsOptional, Matches } from 'class-validator';


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
      message:'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
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