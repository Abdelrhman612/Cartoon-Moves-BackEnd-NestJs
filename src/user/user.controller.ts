import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.GetUsers();
  }
  @Get(':id')
  getUserById(id: string) {
    return this.userService.GetUserById(id);
  }
  @Post()
  createUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.CreateUser(createUserDto);
  }
  @Patch(':id')
  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.UpdateUser(id, updateUserDto);
  }
  @Delete(':id')
  deleteUser(id: string) {
    return this.userService.DeleteUser(id);
  }
}
