import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from '../../decorators/isPassword.decorator';

export class ChangeUserPassDtoRequest {
  @ApiProperty({
    example: 'TestPassword123',
    description: 'The current password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsPassword()
  oldPassword: string;

  @ApiProperty({
    example: 'TestPassword321',
    description: 'The new password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsPassword()
  newPassword: string;
}

export class ChangeUserPassDtoResponse {
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
