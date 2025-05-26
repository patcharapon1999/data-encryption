import { BadRequestException, Injectable } from '@nestjs/common';
import { CryptoService } from '../service/crypto.service';
import { EncryptRequestDto } from '../dto/request/encrypt-request.dto';
import { EncryptResponseDto } from '../dto/response/encrypt-response.dto';

@Injectable()
export class EncryptUseCase {
  constructor(private readonly cryptoService: CryptoService) {}

  async execute(dto: EncryptRequestDto): Promise<EncryptResponseDto> {
    const aesKey = this.cryptoService.generateAesKey();

    const { iv, encryptedData } = this.cryptoService.encryptAes(dto.payload, aesKey);

    const combinedKey = Buffer.concat([aesKey, iv]);
    const rsaEncryptedKey = this.cryptoService.encryptRsaWithPrivateKey(combinedKey);

    return {
      data1: rsaEncryptedKey.toString('base64'),
      data2: encryptedData.toString('base64'),
    };
  }
}