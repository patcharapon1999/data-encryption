import { DecryptUseCase } from './decrypt.usecase';
import { CryptoService } from '../service/crypto.service';
import { DecryptRequestDto } from '../dto/request/decrypt-request.dto';
import { EncryptRequestDto } from '../dto/request/encrypt-request.dto';
import { EncryptUseCase } from './encrypt.usecase';

describe('DecryptUseCase', () => {
    let decryptUsecase: DecryptUseCase;
    let encryptUsecase: EncryptUseCase;

    beforeEach(() => {
        const service = new CryptoService();
        encryptUsecase = new EncryptUseCase(service);
        decryptUsecase = new DecryptUseCase(service);
    });

    it('should decrypt data successfully', async () => {
        const input: EncryptRequestDto = {
            payload: 'This is secret',
        };

        const encrypted = await encryptUsecase.execute(input);
        const decrypted = await decryptUsecase.execute({
            data1: encrypted.data1,
            data2: encrypted.data2,
        });

        expect(decrypted.payload).toBe(input.payload);
    });

    it('should throw error if data1 is not valid base64 RSA blob', async () => {
        const dto: DecryptRequestDto = {
            data1: Buffer.from('not-valid').toString('base64'),
            data2: Buffer.from('whatever').toString('base64'),
        };

        await expect(decryptUsecase.execute(dto)).rejects.toThrow();
    });
});