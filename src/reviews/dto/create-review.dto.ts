import { IsEmail, IsInt, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RatingsDto {
  @ApiProperty({ example: 7 })
  @IsInt()
  plot_rating: number;

  @ApiProperty({ example: 9 })
  @IsInt()
  music_rating: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  acting_rating: number;

  @ApiProperty({ example: 9 })
  @IsInt()
  overall_rating: number;
}

export class CreateReviewDto {
  @ApiProperty({ example: 550 })
  @IsInt()
  movie_id: number;

  @ApiProperty({ example: 'Великолепный фильм, круто вау' })
  @IsString()
  @IsNotEmpty()
  review_text: string;

  @ApiProperty({ type: RatingsDto })
  @IsObject()
  ratings: RatingsDto;
}

export class ReviewDto {
  @ApiProperty({ example: 'some-object-id' })
  @IsString()
  id: string;

  @ApiProperty({ example: 550 })
  @IsInt()
  movie_id: number;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: RatingsDto })
  @IsObject()
  ratings: RatingsDto;

  @ApiProperty({ example: 'Великолепный фильм, круто вау' })
  @IsString()
  review_text: string;

  @ApiProperty({ example: new Date().toISOString() })
  @IsString()
  created_at: string;
}
