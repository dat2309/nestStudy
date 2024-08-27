// src/account/account.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
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
