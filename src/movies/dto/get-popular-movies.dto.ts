import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class PopularMoviesQueryDto {
  @ApiPropertyOptional({ example: 'en-EN', description: 'The language of the movies' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 1, description: 'The page of results to return' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ example: 'popularity.desc', description: 'The sort order of the results' })
  @IsOptional()
  @IsString()
  sort_by?: string;
}