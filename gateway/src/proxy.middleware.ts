import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, fixRequestBody, Options } from 'http-proxy-middleware';
import { ResponseData } from 'responseClass';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    private proxies: { [key: string]: ReturnType<typeof createProxyMiddleware> } = {};


    use(req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.includes('/api')) {
            try {
                // Your existing proxy logic
                const projectId = req.headers['projectid'] as string;

                // Define the target URL based on the projectId
                let target: string;
                if (req.baseUrl.includes(`api/media/load`)) {
                    // target = 'http://172.16.0.59:3002';
                    target = 'http://localhost:3002';
                } else
                    switch (projectId) {
                        case '1':
                            target = 'http://localhost:3001'; // URL of first-project-be
                            break;
                        case '2':
                            target = 'http://localhost:3002'; // URL of media-service
                            break;
                        default:
                            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData<string>('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR, 'vui lòng truyền projectId'));
                            return;
                    }
                const proxyOptions: Options = {
                    target,
                    changeOrigin: true,
                    pathRewrite: (path) => req.baseUrl.replace(/^\/api/, ''),
                    proxyTimeout: 60000, // Increase timeout if needed
                    secure: false,// Set to true if using HTTPS and require SSL verification,
                    on:
                    {
                        proxyReq: fixRequestBody
                    }
                };
                const proxy = createProxyMiddleware(proxyOptions)
                console.log('proxy', req, res, next)
                proxy(req, res, next);
            } catch (error) {
                console.error('Error in ProxyMiddleware:', error);
                if (error) {
                    res.status(HttpStatus.BAD_REQUEST).json(new ResponseData<string>(error.message, HttpStatus.BAD_REQUEST, null));
                } else {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData<string>('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR, null));
                }

            }
        } else {
            next();
        }
    }
}
