import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { RolesTypes } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserDtoResponse {
  @ApiProperty({
    example: '1234567890abcdef',
    description: 'The ID of the user',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'User',
    description: 'The role assigned to the user',
    enum: RolesTypes,
  })
  @IsString()
  @IsNotEmpty()
  role: RolesTypes;
}