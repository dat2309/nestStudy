import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class CustomHeaderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Access and process custom headers
        const customHeader = req.headers['method'];
        // if (!customHeader) {
        //     res.status(404).send('Custom header not found');
        // }
        console.log('Custom Header:', customHeader);
        next();
    }
}
