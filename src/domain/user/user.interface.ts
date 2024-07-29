import { CreateUserDtoRequest, CreateUserDtoResponse } from "../../users/dto/create-user.dto";
import { ChangeUserPassDtoRequest, ChangeUserPassDtoResponse } from '../../users/dto/change-user-pass.dto';
import { ForgotUserPassDtoRequest, ForgotUserPassDtoResponse } from '../../users/dto/forgot-user-pass.dto';
import { UpdateUserRoleDtoRequest, UpdateUserRoleDtoResponse } from '../../users/dto/update-user-role.dto';
import { DeleteAllUsersDtoResponse, DeleteUserDtoResponse } from '../../users/dto/delete-user.dto';
import { SessionId } from '@prisma/client';
import { GetUserDtoResponse } from "../../users/dto/get-user.dto";

export interface IUser {
  createUser(createUserDto: CreateUserDtoRequest): Promise<CreateUserDtoResponse>;
  findUser(email: string): Promise<GetUserDtoResponse>;
  findAll(): Promise<GetUserDtoResponse[]>;
  changePassword(email: string, updateUserPassDto: ChangeUserPassDtoRequest): Promise<ChangeUserPassDtoResponse>;
  forgotPassword(forgotUserPassDto: ForgotUserPassDtoRequest): Promise<ForgotUserPassDtoResponse>;
  updateRole(updateUserRoleDto: UpdateUserRoleDtoRequest): Promise<UpdateUserRoleDtoResponse>;
  deleteOne(email: string): Promise<DeleteUserDtoResponse>;
  deleteAll(): Promise<DeleteAllUsersDtoResponse>;
  generateSessionId(): Promise<SessionId>;
}
