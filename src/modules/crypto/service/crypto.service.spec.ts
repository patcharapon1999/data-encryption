import { CryptoService } from './crypto.service';
import * as fs from 'fs';
import * as path from 'path';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    service = new CryptoService();
  });

  it('should generate 32-byte AES key', () => {
    const key = service.generateAesKey();
    expect(key).toBeInstanceOf(Buffer);
    expect(key.length).toBe(32);
  });

  it('should encrypt and decrypt AES data correctly', () => {
    const key = service.generateAesKey();
    const data = 'hello world';

    const { iv, encryptedData } = service.encryptAes(data, key);
    const decrypted = service.decryptAes(encryptedData, key, iv);

    expect(decrypted).toBe(data);
  });

  it('should encrypt and decrypt RSA key correctly', () => {
    const message = Buffer.from('test key');
    const encrypted = service.encryptRsaWithPrivateKey(message);
    const decrypted = service.decryptRsaWithPublicKey(encrypted);

    expect(decrypted.toString()).toBe(message.toString());
  });

  it('should throw error when decrypting with wrong AES key', () => {
    const key1 = service.generateAesKey();
    const key2 = service.generateAesKey();
    const { iv, encryptedData } = service.encryptAes('secret', key1);

    expect(() => {
      service.decryptAes(encryptedData, key2, iv);
    }).toThrow();
  });

  it('should throw error when decrypting with wrong IV', () => {
    const key = service.generateAesKey();
    const { iv, encryptedData } = service.encryptAes('test data', key);
    const wrongIv = Buffer.alloc(16, 0);

    expect(() => {
      service.decryptAes(encryptedData, key, wrongIv);
    }).toThrow();
  });

  it('should throw when RSA decrypting with wrong input', () => {
    const wrongInput = Buffer.from('not-encrypted-data');
    expect(() => {
      service.decryptRsaWithPublicKey(wrongInput);
    }).toThrow();
  });

  it('should return public and private key as string', () => {
  const publicKey = service.getPublicKey();
  const privateKey = service.getPrivateKey();

  expect(typeof publicKey).toBe('string');
  expect(typeof privateKey).toBe('string');
  expect(publicKey).toContain('-----BEGIN PUBLIC KEY-----');
  expect(privateKey).toContain('-----BEGIN RSA PRIVATE KEY-----');
});
});