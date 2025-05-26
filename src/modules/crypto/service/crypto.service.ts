import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CryptoService {
  private readonly rsaPrivateKey: string;
  private readonly rsaPublicKey: string;

  constructor() {
    const keyDir = path.join(process.cwd(), 'keys');

    this.rsaPrivateKey = fs.readFileSync(path.join(keyDir, 'private.pem'), 'utf8');
    this.rsaPublicKey = fs.readFileSync(path.join(keyDir, 'public.pem'), 'utf8');
  }

  generateAesKey(): Buffer {
    return crypto.randomBytes(32);
  }

  encryptAes(data: string, aesKey: Buffer): { iv: Buffer; encryptedData: Buffer } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    return { iv, encryptedData: encrypted };
  }

  decryptAes(encryptedData: Buffer, aesKey: Buffer, iv: Buffer): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    return decrypted.toString('utf8');
  }

  encryptRsaWithPrivateKey(data: Buffer): Buffer {
    return crypto.privateEncrypt(this.rsaPrivateKey, data);
  }

  decryptRsaWithPublicKey(encrypted: Buffer): Buffer {
    return crypto.publicDecrypt(this.rsaPublicKey, encrypted);
  }

  getPublicKey(): string {
    return this.rsaPublicKey;
  }

  getPrivateKey(): string {
    return this.rsaPrivateKey;
  }
}