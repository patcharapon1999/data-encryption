import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { EncryptUseCase } from '../usecase/encrypt.usecase';
import { DecryptUseCase } from '../usecase/decrypt.usecase';

describe('CryptoController', () => {
  let controller: CryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        {
          provide: EncryptUseCase,
          useValue: { execute: jest.fn().mockResolvedValue({ data1: '...', data2: '...' }) },
        },
        {
          provide: DecryptUseCase,
          useValue: { execute: jest.fn().mockResolvedValue({ payload: '...' }) },
        },
      ],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call encryptUseCase and return result', async () => {
    const result = await controller.encrypt({ payload: 'test' });
    expect(result).toHaveProperty('data1');
  });

  it('should call decryptUseCase and return result', async () => {
    const result = await controller.decrypt({ data1: 'abc', data2: 'xyz' });
    expect(result).toHaveProperty('payload');
  });
});