import { IsString, IsEmail, IsOptional, IsNotEmpty, Validate } from 'class-validator';
import { IsUsernameOrEmailConstraint } from '../../../validators/is-username-or-email.constraint';

export class SignInDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Validate(IsUsernameOrEmailConstraint)
  usernameOrEmailCheck: string;
}
