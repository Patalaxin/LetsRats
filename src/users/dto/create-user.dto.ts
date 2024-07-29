import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from '../../decorators/isPassword.decorator';
import { RolesTypes } from "@prisma/client";

export class CreateUserDtoRequest {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPassword()
  password: string;

}

export class CreateUserDtoResponse {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: RolesTypes;

}
