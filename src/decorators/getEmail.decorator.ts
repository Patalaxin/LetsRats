import { createParamDecorator, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface DecodeResult {
  email: string;
  nickname: string;
  iat: number;
  exp: number;
}

export const GetEmailFromToken = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const jwtService = new JwtService();
      const decoded = jwtService.decode(token) as DecodeResult;

      if (!decoded || !decoded.email) {
        throw new UnauthorizedException('Invalid token');
      }

      return decoded.email;
    } catch (err) {
      throw new UnauthorizedException('Something wrong with token');
    }
  },
);
