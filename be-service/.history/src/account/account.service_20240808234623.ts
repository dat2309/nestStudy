// src/account/account.service.ts
import { Inject, Injectable } from '@nestjs/common';
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
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) { }

  async validateAccount(accountName: string, password: string): Promise<any> {
    const account = await this.accountRepository.findOne({ where: { accountName }, relations: ['user'] });
    if (account && await bcrypt.compare(password, account.password)) {
      return account;
    }
    return null;
  }

  async login(account: any) {
    const token = { accountName: account.accountName, sub: account.id, role: account.role, userId: account.user.id };
    account.token = token;
    await this.accountRepository.save(account);
    return {

      access_token: this.jwtService.sign(token),
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
