import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDtoResponse {
  @ApiProperty({
    example: 'User deleted',
    description: 'The message indicating the result of the delete user operation',
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

export class DeleteAllUsersDtoResponse {
  @ApiProperty({
    example: 'All users deleted',
    description: 'The message indicating the result of the delete all users operation',
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
