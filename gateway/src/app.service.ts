import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Gateway Service';
  }
  constructor(private readonly httpService: HttpService) {}

  async getZaloLoginUrl(): Promise<string> {
    try {
      const headers = {
        'Content-Type': 'application/json;charset=utf-8', // Adjust as needed
        // Add other headers if necessary
      };
      const body = {
        // Include body parameters if needed
      };
      const url = 'https://id.zalo.me/account?continue=https://chat.zalo.me';
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      const cookies = response.headers['set-cookie'];

      return this.getZaloLoginCpode(cookies);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Zalo login URL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getZaloLoginCpode(cookies): Promise<string> {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8', // Adjust as needed
      Cookie: cookies,
      Referer: 'https://id.zalo.me/account?continue=https://chat.zalo.me',

      // Add other headers if necessary
    };
    const body = {
      // Include body parameters if needed
    };
    const url = 'https://id.zalo.me/account/authen/qr/generate';
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      console.log(response);
      response.data.data.cookies = cookies;

      return response.data.data;
    } catch (error) {
      console.error(
        'Error calling Zalo API:',
        error.response?.data || error.message,
      );
      if (error.response) {
        console.log('Full error response:', error.response);
      }
      throw error;
    }
  }

  async getZaloWatingScan(cookies, code): Promise<string> {
    cookies;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded', // Adjust as needed
      Referer: 'https://id.zalo.me/account?continue=https://chat.zalo.me',
      Cookie: cookies,

      // Add other headers if necessary
    };
    const body = {
      code: code,
      // Include body parameters if needed
    };
    const url = 'https://id.zalo.me/account/authen/qr/waiting-scan';
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers, timeout: 60000 * 3 }),
      );
      response.data.data.statusCode = 200;
      return response.data.data;
    } catch (error) {
      console.error(
        'Error calling Zalo API:',
        error.response?.data || error.message,
      );
      const response = {
        statusCode: 504,

        // Include body parameters if needed
      };
      return JSON.stringify(response);
    }
  }

  async getZaloWatingConfirm(cookies, code, token): Promise<string> {
    cookies;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded', // Adjust as needed
      Referer: 'https://id.zalo.me/account?continue=https://chat.zalo.me',
      Cookie: cookies,

      // Add other headers if necessary
    };
    const body = {
      code: code,
      gAction: 'CONFIRM_QR',
      gToken: '',
      // Include body parameters if needed
    };
    const url = ' https://id.zalo.me/account/authen/qr/waiting-confirm';
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers, timeout: 60000 * 3 }),
      );
      response.data.cookies = [...cookies, ...response.headers['set-cookie']];
      response.data.statusCode = 200;
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(
        'Error calling Zalo API:',
        error.response?.data || error.message,
      );

      const response = {
        data: { statusCode: 504 },

        // Include body parameters if needed
      };
      return JSON.stringify(response);
    }
  }
  async checkSession(cookies: string[], req: any): Promise<string> {
    const validCookies = cookies.filter(
      (cookie) => !cookie.includes('EXPIRED'),
    );
    const extractedCookies = validCookies.map((cookie) => {
      const [keyValue] = cookie.split(';');
      return keyValue;
    });
    // Join the cookies into a single string separated by semicolons
    const cookieHeader = extractedCookies.join('; ');
    try {
      let url =
        'https://id.zalo.me/account/checksession?continue=https://chat.zalo.me';
      let lastResponse;
      // Handle all redirects
      while (true) {
        // Prepare headers with the current set of cookies
        const headers = {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          Cookie: cookieHeader,
        };

        try {
          // Make GET request with redirection handling
          const response = await firstValueFrom(
            this.httpService.get(url, { headers, maxRedirects: 0 }),
          );
          lastResponse = response;
          // Check if the response has a redirection location
        } catch (error) {
          if (error.response && error.response.status === 302) {
            const location = error.response.headers['location'];

            if (location) {
              if (location.includes('push')) {
                const finalHeaders = {
                  Accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                  Cookie: cookieHeader,
                };
                try {
                  // Send the last request using only the zpsid cookie
                  const finalResponse = await firstValueFrom(
                    this.httpService.get(location, {
                      headers: finalHeaders,
                      maxRedirects: 0,
                    }),
                  );
                } catch (error) {
                  if (error.response && error.response.status === 302) {
                    validCookies.push(...error.response.headers['set-cookie']);
                    const responseCookies = validCookies.map((cookie) => {
                      const [keyValue] = cookie.split(';');
                      return keyValue;
                    });
                    const uuid1 = uuidv4();
                    const uuid2 = uuidv4();
                    const customUUID = `${uuid1}-${uuid2}`;
                    return JSON.stringify({
                      cookies: responseCookies.join('; '),
                      'user-agent': req.headers['user-agent'],
                      uuid: customUUID,
                    });
                  }
                }
              } else url = location;
            } else {
              break; // No location, stop redirecting
            }
          } else {
            throw error; // Throw the error if it's not a 302 redirect
          }
        }
      }
    } catch (error) {}
  }

  async getZaloUserInfo(cookies): Promise<string> {
    cookies;
    const headers = {
      Cookie: cookies,
      // Add other headers if necessary
    };

    const url = 'https://jr.chat.zalo.me/jr/userinfo';
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers, maxRedirects: 0 }),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error calling Zalo API:',
        error.response?.data || error.message,
      );
      if (error.response) {
        console.log('Full error response:', error.response);
      }
      throw error;
    }
  }
  async getZaloUserLogin(cookies): Promise<string> {
    cookies;
    const headers = {
      Cookie: cookies,
      // Add other headers if necessary
    };

    const url = 'https://jr.chat.zalo.me/jr/userinfo';
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers, maxRedirects: 0 }),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error calling Zalo API:',
        error.response?.data || error.message,
      );
      if (error.response) {
        console.log('Full error response:', error.response);
      }
      throw error;
    }
  }
}
