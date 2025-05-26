import { BadRequestException, Injectable } from '@nestjs/common';
import { CryptoService } from '../service/crypto.service';
import { DecryptRequestDto } from '../dto/request/decrypt-request.dto';
import { DecryptResponseDto } from '../dto/response/decrypt-response.dto';

@Injectable()
export class DecryptUseCase {
  constructor(private readonly cryptoService: CryptoService) {}

  async execute(dto: DecryptRequestDto): Promise<DecryptResponseDto> {
    const encryptedKeyBuffer = Buffer.from(dto.data1, 'base64');
    const encryptedDataBuffer = Buffer.from(dto.data2, 'base64');

    const decryptedKeyAndIv = this.cryptoService.decryptRsaWithPublicKey(encryptedKeyBuffer);
    const aesKey = decryptedKeyAndIv.subarray(0, 32);
    const iv = decryptedKeyAndIv.subarray(32);

    const result = this.cryptoService.decryptAes(encryptedDataBuffer, aesKey, iv);

    return {
      payload: result,
    };
  }
}