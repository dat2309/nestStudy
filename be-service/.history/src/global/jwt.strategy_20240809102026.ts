// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectDataSource } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    [x: string]: any;
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "sạhákh",
        });
    }

    // src/account/jwt.strategy.ts
    async validate(payload: any) {
        const account = await this.dataSource.
        .accountRepository.findOne({ where: { id: payload.sub } });

        // Check if the token is the same as the one stored in the database
        if (!account || account.token !== payload.token) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return account;
    }

}