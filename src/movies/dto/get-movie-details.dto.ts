import { ApiProperty } from '@nestjs/swagger';

export class MovieDetailsDto {
  @ApiProperty({ example: 550, description: 'The ID of the movie' })
  id: number;

  @ApiProperty({ example: 'Inception', description: 'The title of the movie' })
  title: string;

  @ApiProperty({ example: '2010-07-16', description: 'The release date of the movie' })
  release_date: string;

  @ApiProperty({ example: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', description: 'The overview of the movie' })
  overview: string;

  @ApiProperty({ example: 'en', description: 'The original language of the movie' })
  original_language: string;

  @ApiProperty({ example: 8.8, description: 'The average vote rating of the movie' })
  vote_average: number;

  @ApiProperty({ example: 160000000, description: 'The budget of the movie' })
  budget: number;

  @ApiProperty({ example: 825000000, description: 'The revenue of the movie' })
  revenue: number;

  @ApiProperty({ example: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg', description: 'The poster path of the movie' })
  poster_path: string;

  @ApiProperty({ example: 29, description: 'The runtime of the movie in minutes' })
  runtime: number;

  @ApiProperty({ example: 'Released', description: 'The release status of the movie' })
  status: string;

  @ApiProperty({ example: 'Your mind is the scene of the crime.', description: 'The tagline of the movie' })
  tagline: string;

  @ApiProperty({ example: 148.5, description: 'The popularity score of the movie' })
  popularity: number;
}

export class MovieDetailsResponseDto {
  @ApiProperty()
  movie: MovieDetailsDto;
}
