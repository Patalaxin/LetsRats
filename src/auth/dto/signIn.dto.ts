import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDtoRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user. This field is optional.',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'Password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInDtoResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkw',
    description: 'The JWT access token returned after a successful sign-in',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    example: 'dewFe6fewFG882501fGekbx',
    description: 'The JWT refresh token returned after a successful sign-in',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
