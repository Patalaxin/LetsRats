import { ApiProperty } from '@nestjs/swagger';

export class SessionIdDtoResponse {
  @ApiProperty({
    example: 'ebabe788-19dd-4de8-8a77-53a0eb0caa00',
    description: 'The unique session ID generated for the user',
  })
  id: string;
}
