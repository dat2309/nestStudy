import { PartialType } from '@nestjs/swagger';
import { CreateRsaDto } from './create-rsa.dto';

export class UpdateRsaDto extends PartialType(CreateRsaDto) {}
