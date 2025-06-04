import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthGuards } from 'src/utils/Auth.Guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuards)
  getUsers() {
    return this.userService.GetUsers();
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
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
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.UpdateUser(id, updateUserDto);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.DeleteUser(id);
  }
}
