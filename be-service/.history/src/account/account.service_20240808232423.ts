// src/account/account.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async login(accountName: string, password: string) {
    const account = await this.accountRepository.findOne({ accountName, password });
    if (!account) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: account.accountName, sub: account.id };
    const token = this.jwtService.sign(payload);

    // Save token to the account entity
    account.token = token;
    await this.accountRepository.save(account);

    return { access_token: token };
  }

  async login(account: any) {
    const payload = { accountName: account.accountName, sub: account.id, role: account.role, userId: account.user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAccount(accountData: any) {
    const user = await this.userService.create(accountData.user);
    const account = this.accountRepository.create({
      ...accountData,
      password: await bcrypt.hash(accountData.password, 10),
      user,
    });
    return this.accountRepository.save(account);
  }
}
