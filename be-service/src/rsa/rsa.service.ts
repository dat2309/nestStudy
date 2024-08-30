// src/rsa/rsa.service.ts

import { Injectable } from '@nestjs/common';
import { generateKeyPairSync, publicEncrypt } from 'crypto';
import * as forge from 'node-forge';

@Injectable()
export class RsaService {
  private privateKey: string;
  private publicKey: string;

  constructor() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });

    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  encrypt(data: string): string {
    return publicEncrypt(this.publicKey, Buffer.from(data)).toString('base64');
  }

  decrypt(encryptedData: string): string {
    const forgePrivateKey = forge.pki.privateKeyFromPem(this.privateKey);
    const decrypted = forgePrivateKey.decrypt(forge.util.decode64(encryptedData), 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
    return decrypted;
  }
  getPublicKey(): string {
    return this.publicKey;
  }
}
