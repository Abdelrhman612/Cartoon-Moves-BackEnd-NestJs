import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString({ message: 'First name must be a string' })
  firstName: string;
  @IsString({ message: 'Last name must be a string' })
  lastName: string;
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  password: string;
  @IsString({ message: 'Role must be a string' })
  role?: string;
}
export class SignInDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  password: string;
}
