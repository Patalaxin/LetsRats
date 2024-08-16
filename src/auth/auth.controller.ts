import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDtoRequest, SignInDtoResponse } from './dto/signIn.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ExchangeRefreshDto } from './dto/exchangeRefresh.dto';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'Successful response', type: SignInDtoResponse })
  @Post('login')
  signIn(@Res({ passthrough: true }) res: Response, @Body() signInDto: SignInDtoRequest): Promise<SignInDtoResponse> {
    return this.authService.signIn(res, signInDto);
  }

  @ApiOperation({ summary: 'Exchange Refresh Token' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'Successful response', type: SignInDtoResponse })
  @Post('exchange-refresh')
  exchangeRefresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body() exchangeRefreshDto: ExchangeRefreshDto,
  ): Promise<SignInDtoResponse> {
    return this.authService.exchangeRefresh(res, exchangeRefreshDto, req.cookies.refreshToken);
  }
}
