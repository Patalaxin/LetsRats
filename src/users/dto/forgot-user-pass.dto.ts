import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from '../../decorators/isPassword.decorator';

export class ForgotUserPassDtoRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234567890abcdef',
    description: 'The session ID associated with the request',
  })
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({
    example: 'new_Password123',
    description: 'The new password for the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsPassword()
  newPassword: string;
}

export class ForgotUserPassDtoResponse {
  @ApiProperty({
    example: 'Password successfully changed',
    description: 'The message indicating the result of the password change operation',
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
