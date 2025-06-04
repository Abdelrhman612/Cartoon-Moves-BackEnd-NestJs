import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './DataBase/prisma.module';
import { AuthModule } from './Auth/Auth.Module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ConfigModule.forRoot()],
})
export class AppModule {}
