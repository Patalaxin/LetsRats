import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MovieDto {
  @ApiProperty({ example: '/path/to/poster.jpg' })
  poster_path: string;

  @ApiProperty({ example: false })
  adult: boolean;

  @ApiProperty({ example: 'Movie overview...' })
  overview: string;

  @ApiProperty({ example: '2021-12-01' })
  release_date: string;

  @ApiProperty({ example: [28, 12] })
  genre_ids: number[];

  @ApiProperty({ example: 12345 })
  id: number;

  @ApiProperty({ example: 'Original Title' })
  original_title: string;

  @ApiProperty({ example: 'en' })
  original_language: string;

  @ApiProperty({ example: 'Title' })
  title: string;

  @ApiProperty({ example: '/path/to/backdrop.jpg' })
  backdrop_path: string;

  @ApiProperty({ example: 10.5 })
  popularity: number;

  @ApiProperty({ example: 1500 })
  vote_count: number;

  @ApiProperty({ example: false })
  video: boolean;

  @ApiProperty({ example: 7.5 })
  vote_average: number;
}

export class SearchMovieResponseDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ type: [MovieDto] })
  results: MovieDto[];

  @ApiProperty({ example: 100 })
  total_results: number;

  @ApiProperty({ example: 5 })
  total_pages: number;
}

export class SearchMovieQueryDto {
  @ApiPropertyOptional({ example: 'Batman', description: 'The search query string' })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({ example: false, description: 'Whether to include adult content' })
  @IsOptional()
  @IsBoolean()
  include_adult?: boolean;

  @ApiPropertyOptional({ example: 'en-EN', description: 'The language of the query' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 2010, description: 'The primary release year of the movies' })
  @IsOptional()
  @IsNumber()
  primary_release_year?: number;

  @ApiPropertyOptional({ example: 1, description: 'The page of results to return' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ example: 'US', description: 'The region to filter movies' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 2010, description: 'The year of the movies' })
  @IsOptional()
  @IsNumber()
  year?: number;
}


