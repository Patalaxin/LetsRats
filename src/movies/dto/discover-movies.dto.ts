import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class DiscoverMoviesQueryDto {
  @ApiPropertyOptional({ example: 'en', description: 'The language of the movies' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 1, description: 'The page of results to return' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ example: '27', description: 'Filter movies by genre IDs' })
  @IsOptional()
  @IsString()
  with_genres?: string;

  @ApiPropertyOptional({ example: '12', description: 'Filter movies without genre IDs' })
  @IsOptional()
  @IsString()
  without_genres?: string;
}
