import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { ResponseData } from 'responseClass';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const projectId = req.headers['projectid'] as string;
        console
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
                res.status(200).json(new ResponseData<string>('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR, 'vui lòng truyền projectId'));
                console.log(`Proxying request with projectId ${res} to: ${target}${req.baseUrl.replace(/^\/api/, '')}`);
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



        // Create the proxy middleware with the defined options
        const proxy = createProxyMiddleware(proxyOptions);

        proxy(req, res, next);

    }

}
