import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './DataBase/prisma.module';
import { AuthModule } from './Auth/Auth.Module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ConfigModule.forRoot(), MovieModule],
})
export class AppModule {}
