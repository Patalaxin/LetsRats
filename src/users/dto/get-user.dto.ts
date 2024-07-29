import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { RolesTypes } from "@prisma/client";

export class GetUserDtoResponse {
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