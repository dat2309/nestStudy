import { Module } from '@nestjs/common';
import { RsaController } from './rsa.controller';
import { RsaService } from './rsa.service';

@Module({
  controllers: [RsaController],
  providers: [RsaService],
  exports: [RsaService],
})
export class RsaModule { }
