import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { EncryptRequestDto } from '../dto/request/encrypt-request.dto';
import { DecryptRequestDto } from '../dto/request/decrypt-request.dto';
import { EncryptResponseDto } from '../dto/response/encrypt-response.dto';
import { DecryptResponseDto } from '../dto/response/decrypt-response.dto';

import { EncryptUseCase } from '../usecase/encrypt.usecase';
import { DecryptUseCase } from '../usecase/decrypt.usecase';
import { BaseResponse } from '../dto/response/base-response.dto';

@ApiTags('crypto')
@Controller()
export class CryptoController {
  constructor(
    private readonly encryptUseCase: EncryptUseCase,
    private readonly decryptUseCase: DecryptUseCase,
  ) { }

  @Post('/get-encrypt-data')
  @ApiOperation({ summary: 'Encrypt data with AES and RSA' })
  @ApiResponse({ status: 200, description: 'Encrypted result', type: EncryptResponseDto })
  async encrypt(@Body() dto: EncryptRequestDto): Promise<BaseResponse<EncryptResponseDto>> {
    try {
      const result = await this.encryptUseCase.execute(dto);
      return {
        successful: true,
        error_code: null,
        data: result,
      };
    } catch (err) {
      return {
        successful: false,
        error_code: err.message ?? 'UNKNOWN_ERROR',
        data: null,
      };
    }
  }

  @Post('/get-decrypt-data')
  @ApiOperation({ summary: 'Decrypt data from encrypted AES and RSA' })
  @ApiResponse({ status: 200, description: 'Decrypted result', type: DecryptResponseDto })
  async decrypt(@Body() dto: DecryptRequestDto): Promise<BaseResponse<DecryptResponseDto>> {
    try {
      const result = await this.decryptUseCase.execute(dto);
      return {
        successful: true,
        error_code: null,
        data: result,
      };
    } catch (err) {
      return {
        successful: false,
        error_code: err.message ?? 'UNKNOWN_ERROR',
        data: null,
      };
    }
  }
}