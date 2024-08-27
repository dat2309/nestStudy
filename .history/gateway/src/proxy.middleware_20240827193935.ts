import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as httpProxy from 'http-proxy';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
    private readonly proxy: httpProxy;

    constructor() {
        this.proxy = httpProxy.createProxyServer({
            changeOrigin: true,
            selfHandleResponse: true, // Allow handling the response ourselves
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

        // Proxy the request
        this.proxy.web(req, res, { target });

        // Handle proxy response
        this.proxy.on('proxyRes', (proxyRes) => {
            // Set headers from the proxy response if needed
            res.setHeader('Content-Type', proxyRes.headers['content-type'] || 'application/json');
        });

        this.proxy.on('error', (err) => {
            console.error('Proxy error:', err);
            res.status(500).send('Proxy error');
        });
    }
}
