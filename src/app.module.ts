import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import {AuthModule} from "./auth/auth.module";
import {AppController} from "./app.controller";
import {SocketModule} from "@nestjs/websockets/socket-module";
import {BattleGateway} from "./web_socket_server/gateways/battle.gateway";
import {WsGuard} from "./auth/web.socket.guard";
import {JwtService} from "@nestjs/jwt";
import {DatabaseModule} from "./database.module";

@Module({
  imports: [PlayersModule, AuthModule, SocketModule, DatabaseModule],
  controllers: [AppController],
  providers: [BattleGateway, WsGuard, JwtService],
})
export class AppModule {}
