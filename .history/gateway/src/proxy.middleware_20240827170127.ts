import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
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
               new ResponseData<string>('Failed to upload avatar', HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
                res.status(200).json({ message: 'Invalid or missing projectId header' });
                return;
        }
        // Define the proxy middleware options
        const proxyOptions: Options = {
            target,
            changeOrigin: true,
            pathRewrite: (path) => {
                return req.baseUrl.replace(/^\/api/, '')
            }, // Rewrite paths if needed

        };

        console.log(`Proxying request with projectId ${projectId} to: ${target}${req.baseUrl.replace(/^\/api/, '')}`);

        // Create the proxy middleware with the defined options
        const proxy = createProxyMiddleware(proxyOptions);

        proxy(req, res, next);

    }

}
