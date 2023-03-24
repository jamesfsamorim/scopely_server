import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {LocalStrategy} from "./local.auth";
import {PlayersModule} from "../players/players.module";
import {PlayersService} from "../players/players.service";
import {DatabaseModule} from "../database.module";
import {playerProviders} from "../players/player.providers";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        DatabaseModule,
        PlayersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1 day' },
        }),
    ],
    providers: [AuthService, LocalStrategy, ...playerProviders, PlayersService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}