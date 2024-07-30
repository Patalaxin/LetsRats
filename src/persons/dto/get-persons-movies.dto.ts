import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonMoviesQueryDto {
  @ApiProperty({ required: false, description: 'Language of the results' })
  @IsOptional()
  @IsString()
  language?: string;
}

export class PersonMoviesDto {
  @ApiProperty({ example: 1, description: 'ID of the movie' })
  id: number;

  @ApiProperty({ example: 'Iron Man', description: 'Title of the movie' })
  title: string;

  @ApiProperty({ example: '2008-05-02', description: 'Release date of the movie' })
  release_date: string;

  @ApiProperty({ example: 'Actor', description: 'Role in the movie' })
  character: string;

  @ApiProperty({ example: '/path_to_poster.jpg', description: 'Poster path of the movie' })
  poster_path: string;

  @ApiProperty({ example: 'Robert Downey Jr.', description: 'Name of the person' })
  name: string;

  @ApiProperty({ example: 10.0, description: 'Popularity of the person' })
  popularity: number;
}

export class PersonMoviesResponseDto {
  @ApiProperty({ type: [PersonMoviesDto], description: 'List of movie credits' })
  cast: PersonMoviesDto[];

  @ApiProperty({ type: [PersonMoviesDto], description: 'List of movie credits as crew' })
  crew: PersonMoviesDto[];
}
