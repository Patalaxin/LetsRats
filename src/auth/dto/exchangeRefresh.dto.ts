import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class ExchangeRefreshDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
}
