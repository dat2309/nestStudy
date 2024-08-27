import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            return {
                data: null,
                status: 401, // Use 400 status to indicate validation error
                message: "this.formatErrorResponse(errors)",
            };
        }
        return user;
    }
}
