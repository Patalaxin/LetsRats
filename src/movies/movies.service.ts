import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as process from 'node:process';
import { SearchMovieQueryDto, SearchMovieResponseDto } from './dto/search-movies.dto';
import { AxiosRequestConfig } from 'axios';
import { GenreResponseDto } from './dto/get-genres.dto';
import { DiscoverMoviesQueryDto } from './dto/discover-movies.dto';
import { PopularMoviesQueryDto } from "./dto/get-popular-movies.dto";
import { MovieDetailsResponseDto } from "./dto/get-movie-details.dto";
import { TopRatedMoviesQueryDto } from "./dto/get-top-rated-movies.dto";
import { MoviesRecommendationsQueryDto } from "./dto/get-movies-recommendations.dto";
import { MovieActorsDto } from "./dto/get-actors-by-movie.dto";

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async searchMovies(query: SearchMovieQueryDto): Promise<SearchMovieResponseDto> {
    const params: Record<string, any> = { api_key: process.env.TMDB_API_KEY, ...query };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}search/movie`;

    const response = await lastValueFrom(this.httpService.get(url, config));
    return response.data;
  }

  async getGenres(): Promise<GenreResponseDto> {
    const params = { api_key: process.env.TMDB_API_KEY };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}genre/movie/list`;

    const response = await lastValueFrom(this.httpService.get(url, config));
    return response.data;
  }

  async discoverMovies(query: DiscoverMoviesQueryDto): Promise<SearchMovieResponseDto> {
    const params: Record<string, any> = { api_key: process.env.TMDB_API_KEY, ...query };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}discover/movie`;

    const response = await lastValueFrom(this.httpService.get(url, config));
    return response.data;
  }

  async getPopularMovies(query: PopularMoviesQueryDto): Promise<SearchMovieResponseDto> {
    const params: Record<string, any> = { api_key: process.env.TMDB_API_KEY, ...query };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}movie/popular`;

    const response = await lastValueFrom(
      this.httpService.get(url, config),
    );
    return response.data;
  }

  async getTopRatedMovies(query: TopRatedMoviesQueryDto): Promise<SearchMovieResponseDto> {
    const params: Record<string, any> = { api_key: process.env.TMDB_API_KEY, ...query };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}movie/top_rated`;

    const response = await lastValueFrom(
      this.httpService.get(url, config),
    );
    return response.data;
  }

  async getMovieDetails(movie_id: number): Promise<MovieDetailsResponseDto> {
    const params = { api_key: process.env.TMDB_API_KEY };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}movie/${movie_id}`;

    const response = await lastValueFrom(
      this.httpService.get(url, config),
    );
    return { movie: response.data };
  }

  async getMoviesRecommendations(movie_id: number, queryDto: MoviesRecommendationsQueryDto): Promise<SearchMovieResponseDto> {
    const params = {
      api_key: process.env.TMDB_API_KEY,
      language: queryDto.language,
      page: queryDto.page,
    };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}movie/${movie_id}/recommendations`;

    const response = await lastValueFrom(
      this.httpService.get(url, config),
    );
    return response.data;
  }

  async getMovieActors(movie_id: number, language?: string): Promise<MovieActorsDto> {
    const params: AxiosRequestConfig = {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language,
      },
    };
    const url = `${process.env.TMDB_URL}movie/${movie_id}/credits`;

    const response = await lastValueFrom(
      this.httpService.get(url, params),
    );
    return response.data;
  }
}
