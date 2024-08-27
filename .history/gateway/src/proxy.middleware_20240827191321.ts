import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { ResponseData } from 'responseClass';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    private proxies: { [key: string]: ReturnType<typeof createProxyMiddleware> } = {};


    use(req: Request, res: Response, next: NextFunction) {
        try {
            // Your existing proxy logic
            const projectId = req.headers['projectid'] as string;
            console.log(req.headers['Content-Type'])

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

            const proxyOptions: Options = {
                target,
                changeOrigin: true,
                pathRewrite: (path) => req.baseUrl.replace(/^\/api/, ''),
                onProxyReq: (proxyReq, req, res) => {
                    // Capture and set Content-Type if present
                    const contentType = req.headers['content-type'];
                    if (contentType) {
                        proxyReq.setHeader('Content-Type', contentType);
                    }
                },
                onError: (err, req, res) => {
                    console.error('Proxy error:', err);
                    res.status(500).json({ error: 'Proxy error', details: err.message });
                },
                proxyTimeout: 60000, // Increase timeout if needed
                secure: false // Set to true if using HTTPS and require SSL verification
            };



            const proxy = createProxyMiddleware(proxyOptions)
            proxy(req, res, next);
        } catch (error) {
            console.error('Error in ProxyMiddleware:', error);
            if (error) {
                res.status(HttpStatus.BAD_REQUEST).json(new ResponseData<string>(error.message, HttpStatus.BAD_REQUEST, null));
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ResponseData<string>('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR, null));
            }

        }
    }
}
