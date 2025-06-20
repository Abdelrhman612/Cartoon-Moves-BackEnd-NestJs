import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN as string },
    }),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
