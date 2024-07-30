import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { RolesTypes } from "@prisma/client";

export class UpdateUserRoleDtoRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user whose role is to be updated',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Admin',
    description: 'The new role to be assigned to the user',
    enum: RolesTypes,
  })
  @IsString()
  @IsEnum(RolesTypes)
  role: RolesTypes;
}

export class UpdateUserRoleDtoResponse {
  @ApiProperty({
    example: 'Role has been updated successfully',
    description: 'The message indicating the result of the role update operation',
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: 200,
    description: 'The status code of the response',
  })
  @IsNumber()
  status: number;
}
