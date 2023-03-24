import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import {faker} from '@faker-js/faker';
import {Player} from "../players/entities/player.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class PlayerSeeder {
    constructor(
        @Inject('PLAYER_REPOSITORY')
        private playerRepository: Repository<Player>,
    ) {}

    async run() {
        let players: Player[] = [];
        const quantity = 20;

        for (let i = 0; i < quantity; i++) {
            players.push(await this.getRandomPlayer());
        }

        await this.playerRepository.save(players);
    }

    private async getRandomPlayer(): Promise<Player> {
        const player = new Player();

        player.name = faker.name.firstName();
        player.email = faker.internet.email();
        player.password = await this.getEncryptPassword();
        player.gold = faker.datatype.number({min: 10000, max: 10000000});
        player.attack = faker.datatype.number({min: 100, max: 400});
        player.hitPoints = faker.datatype.number({min: 2000, max: 5500});
        player.luck = faker.datatype.number({min: 1, max: 30});
        player.score = faker.datatype.number({min: 500, max: 50000});

        return player;
    }

    private async getEncryptPassword(): Promise<string> {
        const saltOrRounds = 10;

        return await bcrypt.hash('scopely123', saltOrRounds);
    }
}