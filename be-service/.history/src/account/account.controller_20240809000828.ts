// src/account/account.controller.ts
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  async login(@Body() loginDto: CreateAccountDto) {
    const account = await this.accountService.validateAccount(loginDto.accountName, loginDto.password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return this.accountService.login(account);
  }

  @Post('register')
  async register(@Body() accountData: any) {
    return this.accountService.createAccount(accountData);
  }
}
