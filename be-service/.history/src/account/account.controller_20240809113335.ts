// src/account/account.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginDto } from './dto/login.dto';
import { ResponseData } from 'src/global/responseClass';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  async login(@Body() loginDto: LoginDto) : Promise<ResponseData<any>> {
    const account = await this.accountService.validateAccount(loginDto.account_name, loginDto.password);
    if (!account) {
      return {
        data: null,
        status: 401, // Use 400 status to indicate validation error
        message: "Sai tài khoản hoặc mật khâu",
      };
    }
    try {
      return new ResponseData<any[]>(await this.accountService.login(account), HttpStatus.OK, HttpMessage.OK);
    } catch (error) {
      return new ResponseData<User[]>([], HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
    return this.accountService.login(account);
  }

  @Post('register')
  async register(@Body() accountData: any) {
    return this.accountService.createAccount(accountData);
  }
}
