import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SearchPersonsQueryDto, SearchPersonsResponseDto } from './dto/get-persons.dto';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import { PersonMoviesQueryDto, PersonMoviesResponseDto } from './dto/get-persons-movies.dto';

@Injectable()
export class PersonsService {
  constructor(private readonly httpService: HttpService) {}

  async searchPersons(queryDto: SearchPersonsQueryDto): Promise<SearchPersonsResponseDto> {
    const params = {
      api_key: process.env.TMDB_API_KEY,
      query: queryDto.query,
      language: queryDto.language,
      page: queryDto.page,
    };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}search/person`;

    const response = await lastValueFrom(this.httpService.get(url, config));

    return response.data;
  }

  async getPersonMovieCredits(personId: number, queryDto: PersonMoviesQueryDto): Promise<PersonMoviesResponseDto> {
    const params = {
      api_key: process.env.TMDB_API_KEY,
      language: queryDto.language,
    };
    const config: AxiosRequestConfig = { params };
    const url = `${process.env.TMDB_URL}person/${personId}/movie_credits`;

    const response = await lastValueFrom(this.httpService.get(url, config));

    return response.data;
  }
}
