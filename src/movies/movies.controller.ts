import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { SearchMovieQueryDto, SearchMovieResponseDto } from './dto/search-movies.dto';
import { MoviesService } from './movies.service';
import { TokensGuard } from '../guards/tokens.guard';
import { GenreResponseDto } from './dto/get-genres.dto';
import { DiscoverMoviesQueryDto } from './dto/discover-movies.dto';
import { PopularMoviesQueryDto } from './dto/get-popular-movies.dto';
import { MovieDetailsResponseDto } from "./dto/get-movie-details.dto";
import { TopRatedMoviesQueryDto } from "./dto/get-top-rated-movies.dto";
import { MoviesRecommendationsQueryDto } from "./dto/get-movies-recommendations.dto";
import { MovieActorsDto } from "./dto/get-actors-by-movie.dto";
import { MovieVideosResponseDto } from "./dto/get-movie-videos.dto";

@ApiTags('Movies API')
@UseGuards(TokensGuard)
@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get Movies by Query' })
  @Get('search')
  @ApiOkResponse({ description: 'Successful response', type: SearchMovieResponseDto })
  async searchMovies(@Query() query: SearchMovieQueryDto): Promise<SearchMovieResponseDto> {
    return this.moviesService.searchMovies(query);
  }

  @ApiOperation({ summary: 'Get Movies Genres' })
  @Get('genres')
  @ApiOkResponse({ description: 'Successful response', type: GenreResponseDto })
  async getGenres(): Promise<GenreResponseDto> {
    return this.moviesService.getGenres();
  }

  @ApiOperation({ summary: 'Get Movies by Genres' })
  @Get('discover-by-genres')
  @ApiOkResponse({ description: 'Successful response', type: SearchMovieResponseDto })
  async discoverMovies(@Query() query: DiscoverMoviesQueryDto): Promise<SearchMovieResponseDto> {
    return this.moviesService.discoverMovies(query);
  }

  @ApiOperation({ summary: 'Get Popular Movies' })
  @Get('popular')
  @ApiOkResponse({ description: 'Successful response', type: SearchMovieResponseDto })
  async getPopularMovies(@Query() query: PopularMoviesQueryDto): Promise<SearchMovieResponseDto> {
    return this.moviesService.getPopularMovies(query);
  }

  @ApiOperation({ summary: 'Get Top Rated Movies' })
  @Get('top-rated')
  @ApiOkResponse({ description: 'Successful response', type: SearchMovieResponseDto })
  async getTopRatedMovies(@Query() query: TopRatedMoviesQueryDto): Promise<SearchMovieResponseDto> {
    return this.moviesService.getTopRatedMovies(query);
  }

  @ApiOperation({ summary: 'Get Movie Details' })
  @Get('movie-details/:movie_id')
  @ApiParam({ name: 'movie_id', description: 'ID of the movie to retrieve' })
  @ApiOkResponse({ description: 'Successful response', type: MovieDetailsResponseDto })
  async getMovieDetails(@Param('movie_id') movie_id: number): Promise<MovieDetailsResponseDto> {
    return this.moviesService.getMovieDetails(movie_id);
  }

  @ApiOperation({ summary: 'Get Recommendations by Movie' })
  @Get('recommendations/:movie_id')
  @ApiParam({ name: 'movie_id', description: 'ID of the movie to retrieve recommendations for' })
  @ApiOkResponse({ description: 'Successful response', type: SearchMovieResponseDto })
  async getMovieRecommendations(
    @Param('movie_id') movie_id: number,
    @Query() queryDto: MoviesRecommendationsQueryDto
  ): Promise<SearchMovieResponseDto> {
    return this.moviesService.getMoviesRecommendations(movie_id, queryDto);
  }

  @ApiOperation({ summary: 'Get Movie Actors' })
  @ApiParam({ name: 'movie_id', description: 'ID of the movie to retrieve actors for' })
  @ApiOkResponse({ description: 'Successful response', type: MovieActorsDto })
  @Get('actors/:movie_id')
  async getMovieActors(
    @Param('movie_id') movie_id: number,
    @Query('language') language?: string
  ): Promise<MovieActorsDto> {
    return this.moviesService.getMovieActors(movie_id, language);
  }

  @ApiOperation({ summary: 'Get trailers and teasers for a movie' })
  @ApiOkResponse({ description: 'Successful response', type: MovieVideosResponseDto })
  @ApiParam({ name: 'movie_id', description: 'ID of the movie' })
  @Get('videos/:movie_id')
  async getMovieVideos(@Param('movie_id') movie_id: number): Promise<MovieVideosResponseDto> {
    return this.moviesService.getMovieVideos(movie_id);
  }
}