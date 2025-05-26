import { Module } from '@nestjs/common';
import { CryptoController } from './controller/crypto.controller';
import { CryptoService } from './service/crypto.service';
import { EncryptUseCase } from './usecase/encrypt.usecase';
import { DecryptUseCase } from './usecase/decrypt.usecase';

@Module({
  controllers: [CryptoController],
  providers: [
    CryptoService,
    EncryptUseCase,
    DecryptUseCase,
  ],
  exports: [CryptoService],
})
export class CryptoModule {}