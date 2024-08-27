import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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
                status: 400, // Use 400 status to indicate validation error
                message: this.formatErrorResponse(errors),
            };
        }
        return user;
    }
}
