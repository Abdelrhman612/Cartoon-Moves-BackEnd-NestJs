import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './DataBase/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, ConfigModule.forRoot()],
})
export class AppModule {}
