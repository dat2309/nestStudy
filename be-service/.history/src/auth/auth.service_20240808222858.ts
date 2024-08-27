import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) { }

  async validateUser(name: string, password: string): Promise<any> {
    const account = await this.accountRepository.findOne({ where: { name } });
    if (account && await bcrypt.compare(password, account.password)) {
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async login(account: Account) {
    const payload = { name: account.name, sub: account.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
