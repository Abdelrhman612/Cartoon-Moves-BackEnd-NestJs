import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from './decorator.role';

export class AuthGuards implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>();
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }
    try {
      const tokenPayload = await this.jwtService.verifyAsync<{
        email: string;
        role: string;
        id: string;
      }>(token, {
        secret: process.env.JWT_SECRET as string,
      });
      request['user'] = tokenPayload;
      const requreRoles = this.reflector.get<string[]>(
        Roles,
        context.getHandler(),
      );
      if (!requreRoles) {
        return true;
      }
      if (!requreRoles.includes(tokenPayload.role)) {
        throw new ForbiddenException(
          `You need one of these roles: ${requreRoles.join(', ')}`,
        );
      }
      return true;
    } catch {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}
