import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TokensGuard } from '../guards/tokens.guard';
import { PersonsService } from './persons.service';
import { SearchPersonsQueryDto, SearchPersonsResponseDto } from './dto/get-persons.dto';
import { PersonMoviesQueryDto, PersonMoviesResponseDto } from './dto/get-persons-movies.dto';

@ApiTags('Persons API')
@UseGuards(TokensGuard)
@Controller('persons')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @ApiOperation({ summary: 'Search for persons' })
  @ApiOkResponse({ description: 'Successful response', type: SearchPersonsResponseDto })
  @Get('search')
  async searchPersons(@Query() queryDto: SearchPersonsQueryDto): Promise<SearchPersonsResponseDto> {
    return this.personsService.searchPersons(queryDto);
  }

  @ApiOperation({ summary: 'Get movies persons' })
  @ApiOkResponse({ description: 'Successful response', type: PersonMoviesResponseDto })
  @ApiParam({ name: 'personId', description: 'ID of the person' })
  @Get('movies/:personId')
  async getPersonMovieCredits(
    @Param('personId') personId: number,
    @Query() queryDto: PersonMoviesQueryDto,
  ): Promise<PersonMoviesResponseDto> {
    return this.personsService.getPersonMovieCredits(personId, queryDto);
  }
}
