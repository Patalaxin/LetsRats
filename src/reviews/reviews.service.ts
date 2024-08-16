import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto, ReviewDto } from './dto/create-review.dto';
import { Prisma } from '@prisma/client';
import { PaginatedReviewsDto, QueryReviewsDto } from './dto/get-all-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(createReviewDto: CreateReviewDto, email: string): Promise<ReviewDto> {
    try {
      const review = await this.prisma.review.create({
        data: {
          movie_id: createReviewDto.movie_id,
          email: email,
          ratings: {
            create: createReviewDto.ratings,
          },
          review_text: createReviewDto.review_text,
        },
        include: {
          ratings: true, // Include related ratings in the response
        },
      });

      return {
        id: review.id,
        movie_id: review.movie_id,
        email: review.email,
        ratings: review.ratings,
        review_text: review.review_text,
        created_at: review.created_at.toISOString(),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('You have already reviewed this movie.');
      }
      throw error;
    }
  }

  async getReviews(email: string, query: QueryReviewsDto): Promise<PaginatedReviewsDto> {
    const { page = '1', limit = '10', ratings, sortByRating, sortByDate } = query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (Number.isNaN(pageNum) || pageNum < 1) {
      throw new BadRequestException('Invalid page number');
    }

    if (Number.isNaN(limitNum) || limitNum < 1) {
      throw new BadRequestException('Invalid limit number');
    }

    const skip = (pageNum - 1) * limitNum;

    const orderBy: Prisma.ReviewOrderByWithRelationInput[] = [];

    if (sortByRating) {
      orderBy.push({ ratings: { overall_rating: sortByRating } });
    }

    if (sortByDate) {
      orderBy.push({ created_at: sortByDate });
    }

    let ratingsArray: number[] = [];
    if (ratings) {
      try {
        ratingsArray = ratings.split(',').map((rating) => {
          const num = parseInt(rating, 10);
          if (Number.isNaN(num)) {
            throw new BadRequestException('Invalid rating value');
          }
          return num;
        });
      } catch (error) {
        throw new BadRequestException('Invalid ratings format');
      }
    }

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        skip,
        take: limitNum,
        where: {
          email,
          ...(ratingsArray.length > 0 && { ratings: { plot_rating: { in: ratingsArray } } }),
        },
        orderBy,
        include: {
          ratings: true,
        },
      }),
      this.prisma.review.count({
        where: {
          email,
          ...(ratingsArray.length > 0 && { ratings: { plot_rating: { in: ratingsArray } } }),
        },
      }),
    ]);

    const transformedReviews: ReviewDto[] = reviews.map((review) => ({
      ...review,
      created_at: review.created_at.toISOString(), // Transform Date to string
    }));

    const totalPages = Math.ceil(total / limitNum);

    return {
      reviews: transformedReviews,
      totalItems: total,
      currentPage: pageNum,
      totalPages,
    };
  }

  async getReviewsByMovieId(movie_id: number, query: QueryReviewsDto): Promise<PaginatedReviewsDto> {
    const { page = '1', limit = '10', ratings, sortByRating, sortByDate } = query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (Number.isNaN(pageNum) || pageNum < 1) {
      throw new BadRequestException('Invalid page number');
    }

    if (Number.isNaN(limitNum) || limitNum < 1) {
      throw new BadRequestException('Invalid limit number');
    }

    const skip = (pageNum - 1) * limitNum;

    const orderBy: Prisma.ReviewOrderByWithRelationInput[] = [];

    if (sortByRating) {
      orderBy.push({ ratings: { overall_rating: sortByRating } });
    }

    if (sortByDate) {
      orderBy.push({ created_at: sortByDate });
    }

    let ratingsArray: number[] = [];
    if (ratings) {
      try {
        ratingsArray = ratings.split(',').map((rating) => {
          const num = parseInt(rating, 10);
          if (Number.isNaN(num)) {
            throw new BadRequestException('Invalid rating value');
          }
          return num;
        });
      } catch (error) {
        throw new BadRequestException('Invalid ratings format');
      }
    }

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        skip,
        take: limitNum,
        where: {
          movie_id,
          ...(ratingsArray.length > 0 && { ratings: { plot_rating: { in: ratingsArray } } }),
        },
        orderBy,
        include: {
          ratings: true,
        },
      }),
      this.prisma.review.count({
        where: {
          movie_id,
          ...(ratingsArray.length > 0 && { ratings: { plot_rating: { in: ratingsArray } } }),
        },
      }),
    ]);

    const transformedReviews: ReviewDto[] = reviews.map((review) => ({
      ...review,
      created_at: review.created_at.toISOString(),
    }));

    const totalPages = Math.ceil(total / limitNum);

    return {
      reviews: transformedReviews,
      totalItems: total,
      currentPage: pageNum,
      totalPages,
    };
  }

  async getReviewByMovieIdAndEmail(movie_id: number, email: string): Promise<ReviewDto> {
    const review = await this.prisma.review.findFirst({
      where: {
        movie_id,
        email,
      },
      include: {
        ratings: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return {
      ...review,
      created_at: review.created_at.toISOString(),
    };
  }

  async deleteReviewsAndRatingsByMovieId(movieId: number): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      // First, find all reviews associated with the movie_id
      const reviews = await prisma.review.findMany({
        where: { movie_id: movieId },
        select: { ratingsId: true },
      });

      // Collect all the ratings IDs that need to be deleted
      const ratingsIds = reviews.map(review => review.ratingsId);

      // Delete all reviews associated with the movie_id
      await prisma.review.deleteMany({
        where: { movie_id: movieId },
      });

      // Delete all ratings associated with the collected ratings IDs
      await prisma.ratings.deleteMany({
        where: { id: { in: ratingsIds } },
      });
    });
  }

  async deleteReviewAndRatingByMovieIdAndEmail(movieId: number, email: string): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      const review = await prisma.review.findFirst({
        where: { movie_id: movieId, email: email },
        include: { ratings: true },
      });

      if (review) {
        await prisma.review.delete({
          where: { id: review.id },
        });

        await prisma.ratings.delete({
          where: { id: review.ratingsId },
        });
      }
    });
  }
}
