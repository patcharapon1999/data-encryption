import { ApiProperty } from "@nestjs/swagger";

export class EncryptResponseDto {
  @ApiProperty()
  data1: string;

  @ApiProperty()
  data2: string;
}