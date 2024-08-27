// src/account/account.service.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
    const payload: JwtPayload = {
      accountName: account.accountName,
      sub: account.id,
      role: account.role,
      userId: account.user.id,
    };
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    // Generate a JWT token with the payload
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
    await this.accountRepository.update(account.id, { token: null });
    // Save the token in the account entity (as a string)
    account.token = accessToken; // Save the token string directly

    console.log('Generated Token:', accessToken);
    payload.token = accessToken; // Save the token string directly
    ;
    // Save the updated account entity in the database
    await this.accountRepository.save(account);

    // Return the JWT token
    return {
      access_token: accessToken
    };
  }

  async createAccount(accountData: any) {
    const account = this.accountRepository.create({
      ...accountData,
      password: await bcrypt.hash(accountData.password, 10)
    });
    return this.accountRepository.save(account);
  }
}
