import { ApiProperty } from "@nestjs/swagger";

export class DecryptResponseDto {
  @ApiProperty()
  payload: string;
}