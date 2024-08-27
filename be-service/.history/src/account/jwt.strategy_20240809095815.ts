// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    // src/account/jwt.strategy.ts
    async validate(payload: any) {
        const account = await this.getE.findOne({ where: { id: payload.sub } });

        // Check if the token is the same as the one stored in the database
        if (!account || account.token !== payload.token) {
            throw new UnauthorizedException();
        }

        return account;
    }

}