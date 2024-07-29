import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { SignInDtoRequest, SignInDtoResponse } from './dto/signIn.dto';
import { ExchangeRefreshDto } from './dto/exchangeRefresh.dto';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async addTokens(user: User): Promise<SignInDtoResponse> {
    const payload = { email: user.email, role: user.role };
    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_CONSTANT,
    });
    const refreshToken: string = randomUUID();
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10);
    await this.prisma.token.upsert({
      create: { refreshToken: hashedRefreshToken, email: user.email },
      update: { refreshToken: hashedRefreshToken, email: user.email },
      where: { email: user.email },
    });

    return { accessToken, refreshToken };
  }

  async signIn(res: Response, signInDto: SignInDtoRequest): Promise<SignInDtoResponse> {
    let user: User;
    if (signInDto.email) {
      user = await this.prisma.user.findFirst({ where: { email: signInDto.email } });

      if (!user) {
        throw new BadRequestException('Email or password invalid');
      }
    } else {
      throw new BadRequestException('Something went wrong');
    }

    const isPasswordMatch: boolean = await bcrypt.compare(signInDto.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Login or password invalid');
    }
    const tokens: SignInDtoResponse = await this.addTokens(user);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 2678400000, // 2 678 400 000 =  31 day in milliseconds
    });

    return tokens;
  }

  async exchangeRefresh(
    res: Response,
    exchangeRefreshDto: ExchangeRefreshDto,
    userRefreshToken: string,
  ): Promise<SignInDtoResponse> {
    let user: User;
    let refreshToken: string;

    try {
      user = await this.prisma.user.findFirst({ where: { email: exchangeRefreshDto.email } });

      ({ refreshToken } = await this.prisma.token.findFirst({
        where: {
          email: exchangeRefreshDto.email,
        },
      }));
    } catch (err) {
      throw new BadRequestException('There is no valid refresh token for this user');
    }

    const isRefreshTokenCorrect: boolean = await bcrypt.compare(userRefreshToken, refreshToken);

    if (!isRefreshTokenCorrect) {
      throw new UnauthorizedException('Incorrect refresh token');
    }

    const tokens: SignInDtoResponse = await this.addTokens(user);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 2678400000, // 2,678,400,000 = day in milliseconds
    });

    return tokens;
  }
}
