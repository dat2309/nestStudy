// src/account/account.controller.ts
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  async login(@Body() loginDto: LoginDto) {
    const account = await this.accountService.validateAccount(loginDto.account_name, loginDto.password);
    if (!account) {
      return {
        data: null,
        status: 400, // Use 400 status to indicate validation error
        message: this.formatErrorResponse(errors),
    };
    }
    return this.accountService.login(account);
  }

  @Post('register')
  async register(@Body() accountData: any) {
    return this.accountService.createAccount(accountData);
  }
}
