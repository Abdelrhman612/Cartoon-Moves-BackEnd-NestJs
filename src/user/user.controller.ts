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
import { Roles } from 'src/utils/decorator.role';
import { AuthGuard } from 'src/utils/Auth.Guards';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(['admin'])
  getUsers() {
    return this.userService.GetUsers();
  }
  @Get(':id')
  @Roles(['admin'])
  getUserById(@Param('id') id: string) {
    return this.userService.GetUserById(id);
  }
  @Post()
  @Roles(['admin'])
  createUser(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.CreateUser(createUserDto);
  }
  @Patch(':id')
  @Roles(['admin'])
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.UpdateUser(id, updateUserDto);
  }
  @Delete(':id')
  @Roles(['admin'])
  deleteUser(@Param('id') id: string) {
    return this.userService.DeleteUser(id);
  }
}
