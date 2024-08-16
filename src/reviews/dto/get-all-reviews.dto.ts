import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumberString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ReviewDto } from "./create-review.dto";

export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export class QueryReviewsDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: '1',
    default: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string = '1';

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: '10',
    default: '10',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string = '10';

  @ApiPropertyOptional({
    description: 'Ratings to filter by',
    example: '1,3,5',
  })
  @IsOptional()
  @IsString()
  ratings?: string;

  @ApiPropertyOptional({
    description: 'Sort order for ratings',
    enum: SortOrder,
    example: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortByRating?: SortOrder;

  @ApiPropertyOptional({
    description: 'Sort order for creation date',
    enum: SortOrder,
    example: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortByDate?: SortOrder;
}

export class PaginatedReviewsDto {
  @ApiProperty({ type: [ReviewDto] })
  reviews: ReviewDto[];

  @ApiProperty({ example: 100 })
  totalItems: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}