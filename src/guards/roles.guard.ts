import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RolesTypes } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface DecodeResult {
  email: string;
  nickname: string;
  iat: number;
  exp: number;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    public jwtService: JwtService,
    public reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles: RolesTypes[] = this.reflector.get<RolesTypes[]>('roles', context.getHandler());

    if (allowedRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);
    const decodedToken: DecodeResult = this.jwtService.decode(token) as DecodeResult;
    if (!decodedToken || !decodedToken.email) {
      throw new BadRequestException('Invalid token');
    }
    try {
      const user = await this.prisma.user.findFirst({ where: { email: decodedToken.email } });
      const userRole: RolesTypes = user.role;
      return allowedRoles.includes(userRole);
    } catch (err) {
      throw new BadRequestException('Probably this user does not exist anymore');
    }
  }
}
