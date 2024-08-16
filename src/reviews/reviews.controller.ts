import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, ReviewDto } from './dto/create-review.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
  ApiParam
} from "@nestjs/swagger";
import { TokensGuard } from '../guards/tokens.guard';
import { GetEmailFromToken } from '../decorators/getEmail.decorator';
import { PaginatedReviewsDto, QueryReviewsDto } from './dto/get-all-reviews.dto';

@ApiTags('Reviews API')
@UseGuards(TokensGuard)
@Controller('reviews')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create review for movie' })
  @ApiCreatedResponse({ description: 'The review has been successfully created.', type: ReviewDto })
  async createReview(@Body() createReviewDto: CreateReviewDto, @GetEmailFromToken() email: string): Promise<ReviewDto> {
    return this.reviewsService.createReview(createReviewDto, email);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get all reviews by email with pagination, sorting, and filtering' })
  @ApiOkResponse({ description: 'Reviews retrieved successfully.', type: PaginatedReviewsDto })
  async getReviews(@Param('email') email: string, @Query() query: QueryReviewsDto): Promise<PaginatedReviewsDto> {
    return this.reviewsService.getReviews(email, query);
  }

  @Get('movie/:movie_id')
  @ApiOperation({ summary: 'Get reviews by movie ID' })
  @ApiOkResponse({ description: 'Reviews retrieved successfully.', type: PaginatedReviewsDto })
  async getReviewsByMovieId(
    @Param('movie_id') movie_id: string,
    @Query() query: QueryReviewsDto,
  ): Promise<PaginatedReviewsDto> {
    const movieId = parseInt(movie_id, 10);
    if (Number.isNaN(movieId)) {
      throw new BadRequestException('Invalid movie ID');
    }

    return this.reviewsService.getReviewsByMovieId(movieId, query);
  }

  @Get('movie/:movie_id/user/:email')
  @ApiOperation({ summary: 'Get review by movie ID and email' })
  @ApiOkResponse({ description: 'Reviews retrieved successfully.', type: ReviewDto })
  async getReviewByMovieIdAndEmail(
    @Param('movie_id') movie_id: string,
    @Param('email') email: string,
  ): Promise<ReviewDto> {
    const movieId = parseInt(movie_id, 10);
    if (Number.isNaN(movieId)) {
      throw new BadRequestException('Invalid movie ID');
    }

    return this.reviewsService.getReviewByMovieIdAndEmail(movieId, email);
  }

  @Delete('movie/:movie_id')
  @ApiParam({ name: 'movie_id', type: Number, description: 'ID of the movie' })
  async deleteReviewsAndRatingsByMovieId(@Param('movie_id') movie_id: string): Promise<void> {
    const parsedMovieId: number = parseInt(movie_id, 10);
    await this.reviewsService.deleteReviewsAndRatingsByMovieId(parsedMovieId);
  }

  @Delete('movie/:movie_id/user')
  @ApiParam({ name: 'movie_id', type: Number, description: 'ID of the movie' })
  @ApiQuery({ name: 'email', type: String, description: 'Email of the user', required: true })
  async deleteReviewAndRatingByMovieIdAndEmail(
    @Param('movie_id') movie_id: string,
    @Query('email') email: string
  ): Promise<void> {
    const parsedMovieId: number = parseInt(movie_id, 10);
    await this.reviewsService.deleteReviewAndRatingByMovieIdAndEmail(parsedMovieId, email);
  }
}
