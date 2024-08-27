// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountRepository } from 'src/repository/account.repository';
import { Account } from './entities/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    [x: string]: any;
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: AccountRepository,
        private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    // src/account/jwt.strategy.ts
    async validate(payload: any) {
        const account = await this.accountRepository.findOne({ where: { id: payload.sub } });

        // Check if the token is the same as the one stored in the database
        if (!account || account.token !== payload.token) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return account;
    }

}