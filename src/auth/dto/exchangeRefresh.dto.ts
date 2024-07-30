import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ExchangeRefreshDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the newly created user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}