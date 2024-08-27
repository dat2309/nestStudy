// src/account/account.controller.ts
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  async login(@Body() loginDto: LoginDto) {
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
