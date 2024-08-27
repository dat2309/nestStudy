import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as httpProxy from 'http-proxy';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    private readonly proxy: httpProxy;

    constructor() {
        this.proxy = httpProxy.createProxyServer({
            changeOrigin: true,
            selfHandleResponse: true,
        });
    }

    use(req: Request, res: Response, next: NextFunction) {
        const projectId = req.headers['projectid'] as string;
        let target: string;

        switch (projectId) {
            case '1':
                target = 'http://localhost:3001';
                break;
            case '2':
                target = 'http://localhost:3002';
                break;
            default:
                res.status(400).json({ error: 'Invalid projectId' });
                return;
        }

        // Handle the request body
        const body = req.body ? JSON.stringify(req.body) : '';

        // Set up the proxy request
        this.proxy.web(req, res, { target, proxyBody: body }, (error) => {
            console.error('Proxy error:', error);
            res.status(500).send('Proxy error');
        });

        this.proxy.on('proxyRes', (proxyRes) => {
            console.log('Proxy Response Headers:', proxyRes.headers);
        });
    }
}
