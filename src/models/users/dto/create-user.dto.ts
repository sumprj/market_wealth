import { IsString, IsEmail, IsNotEmpty, IsDate, IsNumber, MinLength, IsAlphanumeric } from 'class-validator';

/**
 * @TDOD Fix error src/models/users/user.controller.ts:23:40 - error TS2345: Argument of type 'CreateUserDto' is not assignable to parameter of type 'User'.
  Type 'CreateUserDto' is missing the following properties from type 'User': createdDate, hasId, save, remove, update, and 3 more.
 */
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
    birthDate: Date;

    @IsNumber()
    salary: number;
}