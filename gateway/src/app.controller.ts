import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ZaloWatingScanDto } from './dto/zalo.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('zalo-login')
  async zaloLogin(): Promise<string> {
    const loginUrl = await this.appService.getZaloLoginUrl();
    return loginUrl;
  }


  @Post('zalo-wating-scan')
  async zaloWatingScan(
    @Body() zaloWatingScanDto: ZaloWatingScanDto,
    @Req() req
  ): Promise<string> {

    const loginUrl = await this.appService.getZaloWatingScan(zaloWatingScanDto.cookies, zaloWatingScanDto.code);
    return loginUrl;

  }
  @Post('zalo-confirm-scan')
  async zaloConfirmScan(
    @Body() zaloWatingScanDto: ZaloWatingScanDto,
    @Req() req
  ): Promise<string> {

    const loginUrl = await this.appService.getZaloWatingConfirm(zaloWatingScanDto.cookies, zaloWatingScanDto.code, zaloWatingScanDto.token);
    return loginUrl;

  }
  @Post('check')
  async checkSession(
    @Body() zaloWatingScanDto: ZaloWatingScanDto,
    @Req() req
  ): Promise<string> {

    const loginUrl = await this.appService.checkSession(zaloWatingScanDto.cookies,req);
    return loginUrl;

    // Zalo code generation endpoint, which will be called automatically
  }
  @Post('get-user')
  async getUser(
    @Body() zaloWatingScanDto: ZaloWatingScanDto,
    @Req() req
  ): Promise<string> {

    const loginUrl = await this.appService.getZaloUserInfo(zaloWatingScanDto.cookies);
    return loginUrl;

    // Zalo code generation endpoint, which will be called automatically
  }
}
