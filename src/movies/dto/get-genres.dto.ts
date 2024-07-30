import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @ApiProperty({ example: 28 })
  id: number;

  @ApiProperty({ example: 'Action' })
  name: string;
}

export class GenreResponseDto {
  @ApiProperty({ type: [GenreDto] })
  genres: GenreDto[];
}
