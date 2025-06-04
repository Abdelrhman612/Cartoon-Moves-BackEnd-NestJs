import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { SignInDto, SignUpDto } from './dto/Auth.dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    readonly jwtService: JwtService,
  ) {}

  async SignUp(signUpDto: SignUpDto) {
    const { firstName, lastName, email, password } = signUpDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new Error('User already exists');
    }
    const hash = await bcrypt.hash(password, 10);
    const AddUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        role: signUpDto.role || 'user',
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        id: true,
        role: true,
      },
    });
    return {
      status: 'success',
      message: 'User created successfully',
      user: AddUser,
    };
  }
  async SignIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = { email: user.email, role: user.role, id: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      status: 'success',
      message: 'User signed in successfully',
      token,
    };
  }
}
