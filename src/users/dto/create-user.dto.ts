import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from '../../decorators/isPassword.decorator';
import { RolesTypes } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDtoRequest {
  @ApiProperty({
    example: '1234567890bcdef',
    description: 'The session ID associated with the request',
  })
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsPassword()
  password: string;
}

export class CreateUserDtoResponse {
  @ApiProperty({
    example: 'fefq3f-32fefa-f32fa-fdshyt-a234',
    description: 'The ID of the newly created user',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the newly created user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'User',
    description: 'The role assigned to the newly created user',
    enum: RolesTypes,
  })
  @IsString()
  @IsNotEmpty()
  role: RolesTypes;
}
