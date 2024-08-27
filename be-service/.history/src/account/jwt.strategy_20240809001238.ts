// src/account/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.configService.get<string>('JWT_SECRET');,
        });
    }

    async validate(payload: any) {
        const account = await this.accountRepository.findOne({ where: { id: payload.sub }, relations: ['user'] });
        if (!account) {
            throw new UnauthorizedException();
        }
        return account;
    }
}
