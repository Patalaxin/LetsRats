import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { TokensGuard } from '../guards/tokens.guard';
import { ImageQueryDto } from './dto/get-image.dto';
import { Response } from "express";

@ApiTags('Image API')
@UseGuards(TokensGuard)
@Controller('images')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Get image' })
  @ApiOkResponse({ description: 'Returns image' })
  @Get()
  async getImage(@Query() query: ImageQueryDto, @Res() res: Response): Promise<void> {
    try {
      await this.imageService.getImage(query, res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
