import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class EncryptRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'payload required' })
    @Length(1, 2000, { message: 'payload length require 1 to 2000 characters' })
    payload: string;
}