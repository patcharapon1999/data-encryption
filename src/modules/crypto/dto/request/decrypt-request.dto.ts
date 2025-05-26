import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DecryptRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'data1 required' })
  data1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'data2 required' })
  data2: string;
}