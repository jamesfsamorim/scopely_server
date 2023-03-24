import {Injectable, NotAcceptableException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {PlayersService} from "../players/players.service";
import {Player} from "../players/entities/player.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private playersService: PlayersService,
        private jwtService: JwtService
    ) {}

    async validatePlayer(email: string, password: string): Promise<Player> {
        const player = await this.playersService.findByEmail(email);
        const passwordValid = await bcrypt.compare(password, player.password)

        if (!player) {
            throw new NotAcceptableException('Could not find the player');
        }

        if (!passwordValid) {
            throw new UnauthorizedException();
        }

        return player;
    }

    async login(email: string, password: string) {
        const player = await this.validatePlayer(email, password);
        const payload = { email: player.email, sub: player.id };

        return {
            ...player,
            access_token: this.jwtService.sign(payload),
        };
    }
}