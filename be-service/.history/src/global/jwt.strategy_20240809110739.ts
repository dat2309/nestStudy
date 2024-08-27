// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectDataSource } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Account } from 'src/account/entities/account.entity';
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
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    // src/account/jwt.strategy.ts
    async validate(payload: any) {
        const account = await this.dataSource.getRepository(Account)
            .findOne({ where: { id: payload.sub } });
        console.log(account.token)
        console.log(this.jwtService.verify(payload, { secret: process.env.JWT_SECRET });)
        
        if (!account || account.token !== payload.token) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return account;
    }

}