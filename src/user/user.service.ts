import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async GetUsers() {
    const users = await this.prisma.user.findMany();
    return { status: 'sucess', length: users.length, data: users };
  }
  async GetUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return { status: 'error', message: 'User not found' };
    }
    return { status: 'success', data: user };
  }
  async CreateUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return { status: 'error', message: 'User already exists' };
    }
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });
    return { status: 'success', data: newUser };
  }
  async UpdateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return { status: 'error', message: 'User not found' };
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return { status: 'success', data: updatedUser };
  }
  async DeleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return { status: 'error', message: 'User not found' };
    }
    await this.prisma.user.delete({
      where: { id },
    });
    return { status: 'success', message: 'User deleted successfully' };
  }
}
