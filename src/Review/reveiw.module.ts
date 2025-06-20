import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ReviewService } from './Reveiew.service';
import { ReviewController } from './reveiew.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN as string },
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReveiewModule {}
