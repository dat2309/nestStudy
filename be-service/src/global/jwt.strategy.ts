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
            .findOne({ where: { id: payload.sub }, relations: ['user'], });
        if (!account ) {
            throw new UnauthorizedException('Người dùng không tồn tại');
        }
        if ( account.tokenVersion !== payload.tokenVersion) {
            throw new UnauthorizedException('Phiên đăng nhập hết hạn');
        }

        return account;
    }

}