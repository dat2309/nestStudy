import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './login.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
