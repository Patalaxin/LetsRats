import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AllowedWidths {
  w200 = 'w200',
  w300 = 'w300',
  w400 = 'w400',
  w500 = 'w500',
  original = 'original',
}

export class ImageQueryDto {
  @ApiProperty({
    description: 'Width of the image (e.g., w500, original)',
    example: 'w500',
    required: false,
  })
  @IsOptional()
  @IsString()
  width?: AllowedWidths;

  @ApiProperty({
    description: 'Path of the image',
    example: '/3qx2QFUbG6t6IlzR0F9k3Z6Yhf7.jpg',
  })
  @IsString()
  path: string;
}
