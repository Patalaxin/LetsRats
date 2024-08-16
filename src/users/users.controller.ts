import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserRoleDtoRequest, UpdateUserRoleDtoResponse } from './dto/update-user-role.dto';
import { ChangeUserPassDtoRequest, ChangeUserPassDtoResponse } from './dto/change-user-pass.dto';
import { ForgotUserPassDtoRequest, ForgotUserPassDtoResponse } from './dto/forgot-user-pass.dto';
import { DeleteAllUsersDtoResponse, DeleteUserDtoResponse } from './dto/delete-user.dto';
import { CreateUserDtoRequest, CreateUserDtoResponse } from './dto/create-user.dto';
import { RolesGuard } from '../guards/roles.guard';
import { TokensGuard } from '../guards/tokens.guard';
import { GetEmailFromToken } from '../decorators/getEmail.decorator';
import { Roles } from '../decorators/roles.decorator';
import { IUser } from '../domain/user/user.interface';
import { RolesTypes, SessionId } from '@prisma/client';
import { GetUserDtoResponse } from './dto/get-user.dto';
import { SessionIdDtoResponse } from "./dto/create-sessionId.dto";

@ApiTags('User API')
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(@Inject('IUser') private readonly userInterface: IUser) {}

  @Roles()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Create User' })
  @ApiOkResponse({ description: 'Successful response', type: CreateUserDtoResponse })
  @Post()
  async create(@Body() createUserDto: CreateUserDtoRequest): Promise<CreateUserDtoResponse> {
    return this.userInterface.createUser(createUserDto);
  }

  @UseGuards(TokensGuard)
  @Roles()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User By Email' })
  @ApiOkResponse({ description: 'Successful response', type: GetUserDtoResponse })
  @Get()
  async getOne(@GetEmailFromToken() email: string): Promise<GetUserDtoResponse> {
    return this.userInterface.findUser(email);
  }

  @UseGuards(TokensGuard)
  @Roles(RolesTypes.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find All Users [Admin]' })
  @ApiOkResponse({
    description: 'Successful response',
    type: [GetUserDtoResponse],
  })
  @Get('/all')
  async findAll(): Promise<GetUserDtoResponse[]> {
    return this.userInterface.findAll();
  }

  @UseGuards(TokensGuard)
  @Roles()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change User Password' })
  @ApiOkResponse({ description: 'Success', type: ChangeUserPassDtoResponse })
  @Put('/change-password')
  changePassword(
    @GetEmailFromToken() email: string,
    @Body() updateUserPassDto: ChangeUserPassDtoRequest,
  ): Promise<ChangeUserPassDtoResponse> {
    return this.userInterface.changePassword(email, updateUserPassDto);
  }

  @Roles()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Forgot User Password' })
  @ApiOkResponse({ description: 'Success', type: ForgotUserPassDtoResponse })
  @Put('/forgot-password')
  forgotPassword(@Body() forgotUserPassDto: ForgotUserPassDtoRequest): Promise<ForgotUserPassDtoResponse> {
    return this.userInterface.forgotPassword(forgotUserPassDto);
  }

  @UseGuards(TokensGuard)
  @Roles(RolesTypes.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update The User Role [Admin]' })
  @ApiOkResponse({ description: 'Success', type: UpdateUserRoleDtoResponse })
  @Put('/role')
  updateRole(@Body() updateUserRoleDto: UpdateUserRoleDtoRequest): Promise<UpdateUserRoleDtoResponse> {
    return this.userInterface.updateRole(updateUserRoleDto);
  }

  @UseGuards(TokensGuard)
  @Roles(RolesTypes.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete User By Email [Admin]' })
  @ApiOkResponse({ description: 'Success', type: DeleteUserDtoResponse })
  @Delete(':email')
  deleteOne(@Param('email') email: string): Promise<DeleteUserDtoResponse> {
    return this.userInterface.deleteOne(email);
  }

  @UseGuards(TokensGuard)
  @Roles(RolesTypes.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete All Users [Admin]' })
  @ApiOkResponse({ description: 'Success', type: DeleteAllUsersDtoResponse })
  @Delete('/all')
  deleteAll(): Promise<DeleteAllUsersDtoResponse> {
    return this.userInterface.deleteAll();
  }

  @Roles(RolesTypes.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate Session Id [Admin]' })
  @ApiOkResponse({ description: 'Successful response', type: SessionIdDtoResponse })
  @Post('/generate-session-id')
  async generateSessionId(): Promise<SessionId> {
    try {
      return this.userInterface.generateSessionId();
    } catch (error) {
      throw new HttpException('Session Id does not created', HttpStatus.BAD_REQUEST);
    }
  }
}
