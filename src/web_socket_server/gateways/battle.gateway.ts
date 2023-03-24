import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {Injectable, UseGuards} from "@nestjs/common";
import {WsGuard} from "../../auth/web.socket.guard";
import {PlayerSocket} from "../interfaces/player.socket.interface";
import {PlayersService} from "../../players/players.service";

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class BattleGateway {
    @WebSocketServer() server: Server;
    private players: PlayerSocket[] = [];

    constructor(private readonly playersService: PlayersService) {}

    @UseGuards(WsGuard)
    @SubscribeMessage('register')
    registerClient(client: Socket, player: Omit<PlayerSocket, 'socketId'>) {
        const socketPlayer: PlayerSocket = {
            ...player,
            socketId: client.id
        };

        const canAddPlayer = typeof player !== "undefined" && !this.players.find( player =>
            player.socketId === client.id || socketPlayer.id === player.id
        );

        canAddPlayer && this.players.push(socketPlayer)
    }

    @UseGuards(WsGuard)
    handleDisconnect(client: Socket) {
        console.log('Client disconnected');
        console.log('players before: ', this.players);
        this.players = this.players.filter((player) => player.socketId !== client.id);
        console.log('players after: ', this.players);
    }

    @UseGuards(WsGuard)
    @SubscribeMessage('findOpponents')
    findOpponents(client: Socket) {
        const acceptableGapScore = 1000;
        const [player] = this.players.filter( player => player.socketId === client.id)
        if (!player) {
            return;
        }

        const maxScore = player.score + acceptableGapScore;
        const minScore = player.score + acceptableGapScore;
        let opponents = [];

        if (player) {
            opponents = this.players.filter( opponent =>
                opponent.socketId !== client.id && (opponent.score >= minScore || opponent.score <= maxScore)
            )
        }

        return opponents.length > 0 ? opponents : this.playersService.findOpponents(player.id);
    }
}
