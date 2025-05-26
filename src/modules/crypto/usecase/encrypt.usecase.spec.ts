import { EncryptUseCase } from './encrypt.usecase';
import { CryptoService } from '../service/crypto.service';
import { EncryptRequestDto } from '../dto/request/encrypt-request.dto';

describe('EncryptUseCase', () => {
  let usecase: EncryptUseCase;

  beforeEach(() => {
    const service = new CryptoService();
    usecase = new EncryptUseCase(service);
  });

  it('should encrypt data successfully', async () => {
    const dto: EncryptRequestDto = { payload: 'secret message' };
    const result = await usecase.execute(dto);

    expect(result).toHaveProperty('data1');
    expect(result).toHaveProperty('data2');
    expect(typeof result.data1).toBe('string');
    expect(typeof result.data2).toBe('string');
  });

  it('should throw if AES encryption logic fails', async () => {
    const mockService = {
      generateAesKey: jest.fn().mockReturnValue(Buffer.alloc(32)),
      encryptAes: jest.fn(() => {
        throw new Error('AES encryption failed');
      }),
      encryptRsaWithPrivateKey: jest.fn(),
    } as unknown as CryptoService;

    const brokenUsecase = new EncryptUseCase(mockService);
    const dto: EncryptRequestDto = { payload: 'any data' };

    await expect(brokenUsecase.execute(dto)).rejects.toThrow('AES encryption failed');
  });
});