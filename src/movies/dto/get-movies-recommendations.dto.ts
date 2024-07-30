import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class MoviesRecommendationsQueryDto {
  @ApiPropertyOptional({ example: 'en-US', description: 'The language of the results' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 1, description: 'The page of results to retrieve' })
  @IsOptional()
  @IsString()
  page?: string;
}
