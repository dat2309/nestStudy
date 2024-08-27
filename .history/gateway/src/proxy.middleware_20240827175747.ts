import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Agent } from 'http';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { ResponseData } from 'responseClass';
import { PassThrough } from 'stream';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    private proxies: { [key: string]: ReturnType<typeof createProxyMiddleware> } = {};
    

    use(req: Request, res: Response, next: NextFunction) {
        try {
            // Your existing proxy logic
            const proxy = this.proxies[projectId];
            proxy(req, res, next);
            console.log(`Proxying request with projectId ${projectId} to: ${target}${req.baseUrl.replace(/^\/api/, '')}`);
          } catch (error) {
            console.error('Error in ProxyMiddleware:', error);
            if (error instanceof BadRequestError) {
              res.status(HttpStatus.BAD_REQUEST).json(new ResponseData<string>(error.message, HttpStatus.BAD_REQUEST, null));
            } else {
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData<string>('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR, null));
            }
     
    }
}
