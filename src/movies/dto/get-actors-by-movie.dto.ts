import { ApiProperty } from '@nestjs/swagger';

export class CastDto {
  @ApiProperty({ example: 2, description: 'The gender of the cast member' })
  gender: number;

  @ApiProperty({ example: 1, description: 'The ID of the cast member' })
  id: number;

  @ApiProperty({ example: 'Robert Downey Jr.', description: 'The name of the cast member' })
  name: string;

  @ApiProperty({ example: 'Tony Stark / Iron Man', description: 'The character played by the cast member' })
  character: string;

  @ApiProperty({ example: '/path/to/profile.jpg', description: 'The profile path of the cast member' })
  profile_path: string;

  @ApiProperty({ example: 1, description: 'The order of the cast member in the credits' })
  order: number;

  @ApiProperty({ example: 10.0, description: 'The popularity of the cast member' })
  popularity: number;
}

export class CrewDto {
  @ApiProperty({ example: 2, description: 'The gender of the crew member' })
  gender: number;

  @ApiProperty({ example: 1, description: 'The ID of the crew member' })
  id: number;

  @ApiProperty({ example: 'Jon Favreau', description: 'The name of the crew member' })
  name: string;

  @ApiProperty({ example: 'Director', description: 'The job of the crew member' })
  job: string;

  @ApiProperty({ example: '/path/to/profile.jpg', description: 'The profile path of the crew member' })
  profile_path: string;

  @ApiProperty({ example: 10.0, description: 'The popularity of the crew member' })
  popularity: number;
}

export class MovieActorsDto {
  @ApiProperty({ type: [CastDto], description: 'The cast members of the movie' })
  cast: CastDto[];

  @ApiProperty({ type: [CrewDto], description: 'The crew members of the movie' })
  crew: CrewDto[];
}
