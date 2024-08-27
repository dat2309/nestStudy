import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { ResponseData } from 'responseClass';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    private proxies: { [key: string]: ReturnType<typeof createProxyMiddleware> } = {};

    use(req: Request, res: Response, next: NextFunction) {
        const projectId = req.headers['projectid'] as string;

        // Define the target URL based on the projectId
        let target: string;
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

        // Reuse or create the proxy middleware
        if (!this.proxies[projectId]) {
            const proxyOptions: Options = {
                target,
                changeOrigin: true,
                pathRewrite: (path) => req.baseUrl.replace(/^\/api/, ''),
                selfHandleResponse: false, // Ensure proxy handles response
                timeout: 100000, // Set a timeout for the request

            };
            this.proxies[projectId] = createProxyMiddleware(proxyOptions);
        }

        const proxy = this.proxies[projectId];
        proxy(req, res, next);
        console.log(`Proxying request with projectId ${projectId} to: ${target}${req.baseUrl.replace(/^\/api/, '')}`);
    }
}
