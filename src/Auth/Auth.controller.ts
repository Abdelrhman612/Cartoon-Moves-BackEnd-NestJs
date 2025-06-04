import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './Auth.Service';
import { SignInDto, SignUpDto } from './dto/Auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign-up')
  signUp(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signUpDto: SignUpDto,
  ) {
    return this.authService.SignUp(signUpDto);
  }
  @Post('sign-in')
  signIn(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    signInDto: SignInDto,
  ) {
    return this.authService.SignIn(signInDto);
  }
}
