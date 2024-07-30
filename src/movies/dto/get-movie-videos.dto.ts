import { ApiProperty } from '@nestjs/swagger';

export class MovieVideoDto {
  @ApiProperty({ example: '533ec654c3a36854480003eb', description: 'ID of the video' })
  id: string;

  @ApiProperty({ example: 'en', description: 'Language of the video' })
  iso_639_1: string;

  @ApiProperty({ example: 'US', description: 'Country of the video' })
  iso_3166_1: string;

  @ApiProperty({ example: 'SUXWAEX2jlg', description: 'Key of the video on the hosting site' })
  key: string;

  @ApiProperty({ example: 'Trailer', description: 'Name of the video' })
  name: string;

  @ApiProperty({ example: 'YouTube', description: 'Site hosting the video' })
  site: string;

  @ApiProperty({ example: 720, description: 'Resolution of the video' })
  size: number;

  @ApiProperty({ example: 'Trailer', description: 'Type of the video' })
  type: string;

  @ApiProperty({ example: true, description: 'Whether the video is official' })
  official: boolean;

  @ApiProperty({ example: '2011-05-10T19:22:14.000Z', description: 'Date when the video was published' })
  published_at: string;

  @ApiProperty({ example: 'https://www.youtube.com/watch?v=SUXWAEX2jlg', description: 'Full URL to the video' })
  url: string;
}

export class MovieVideosResponseDto {
  @ApiProperty({ example: 550, description: 'ID of the movie' })
  id: number;

  @ApiProperty({ type: [MovieVideoDto], description: 'List of videos' })
  results: MovieVideoDto[];
}
