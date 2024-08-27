import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
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
        private readonly configService: ConfigService, // Inject ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'), // Use ConfigService to get JWT secret
        });
    }

    async validate(payload: any) {
        console
        const account = await this.accountRepository.findOne({
            where: { id: payload.sub },
            relations: ['user'],
        });
        if (!account) {
            throw new UnauthorizedException('Invalid token');
        }
        return account;
    }
}
