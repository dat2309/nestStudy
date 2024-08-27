import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            map((data) => {
                // Change all 2xx status codes to 200
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    response.statusCode = 200;
                }
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    response.statusCode = 200;
                }
                return data;
            }),
        );
    }
}
