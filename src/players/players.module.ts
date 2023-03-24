import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import {playerProviders} from "./player.providers";
import {DatabaseModule} from "../database.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [PlayersController],
  providers: [...playerProviders, PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
