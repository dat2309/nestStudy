// src/rsa/rsa.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { RsaService } from './rsa.service';

@Controller('rsa')
export class RsaController {
  constructor(private readonly rsaService: RsaService) { }

  @Get('plk')
  getPublicKey(): string {
    const base64PublicKey = Buffer.from(this.rsaService.getPublicKey()).toString('base64');
    return base64PublicKey;
  }

  @Post('encrypt')
  encrypt(@Body('data') data: string): string {
    return this.rsaService.encrypt(data);
  }

  @Post('decrypt')
  decrypt(@Body('data') data: string): string {
    return this.rsaService.decrypt(data);
  }
}
