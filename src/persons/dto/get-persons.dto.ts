import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPersonsQueryDto {
  @ApiProperty({ required: true, description: 'Search query' })
  @IsString()
  query: string;

  @ApiProperty({ required: false, description: 'Language of the results' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ required: false, description: 'Page number for paginated results' })
  @IsOptional()
  @IsString()
  page?: string;
}

export class PersonDto {
  @ApiProperty({ example: 1, description: 'ID of the person' })
  id: number;

  @ApiProperty({ example: 'Robert Downey Jr.', description: 'Name of the person' })
  name: string;

  @ApiProperty({ example: '2008-05-02', description: 'Known for department' })
  known_for_department: string;

  @ApiProperty({ example: 'https://image.tmdb.org/t/p/w500/path_to_image.jpg', description: 'Profile image URL' })
  profile_path: string;

  @ApiProperty({ example: 10.0, description: 'Popularity of the person' })
  popularity: number;
}

export class SearchPersonsResponseDto {
  @ApiProperty({ example: 1, description: 'Page number of the results' })
  page: number;

  @ApiProperty({ type: [PersonDto], description: 'List of people found' })
  results: PersonDto[];

  @ApiProperty({ example: 100, description: 'Total number of results' })
  total_results: number;

  @ApiProperty({ example: 10, description: 'Total number of pages' })
  total_pages: number;
}
