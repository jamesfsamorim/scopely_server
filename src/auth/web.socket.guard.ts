import {CanActivate, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {PlayersService} from "../players/players.service";

@Injectable()
export class WsGuard implements CanActivate {
    constructor(private playersService: PlayersService, private jwtService: JwtService) {}

    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const bearerToken = context.args[0].handshake.headers.authorization;
        try {
            const decoded = this.jwtService.verify(bearerToken, {secret: process.env.JWT_SECRET}) as any;
            return new Promise((resolve, reject) => {
                return this.playersService.findByEmail(decoded.email).then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject(false);
                    }
                });
            });
        } catch (err) {
            return false;
        }
    }
}