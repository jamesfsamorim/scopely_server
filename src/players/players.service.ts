import {Inject, Injectable} from '@nestjs/common';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {Repository} from "typeorm";
import {Player} from "./entities/player.entity";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class PlayersService {
  constructor(
      @Inject('PLAYER_REPOSITORY')
      private playerRepository: Repository<Player>,
      private jwtService: JwtService,
  ) {}

  async create(createPlayerDto: Omit<Player, 'id' | 'challengerBattles' |
      'defenderBattles' | 'battleLogActions' | 'battleLogReceivingActions' | 'score'>) {
    const saltOrRounds = 10;
    createPlayerDto.password = await bcrypt.hash(createPlayerDto.password, saltOrRounds);

    const player = await this.playerRepository.save(createPlayerDto);
    const payload = { email: player.email, sub: player.id };

    return {
      ...player,
      access_token: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET})
    };
  }

  async findAll() {
    return await this.playerRepository.find();
  }

  async findOne(id: number) {
    return await this.playerRepository.findOneBy({id});
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerRepository.save({
      id,
      ...updatePlayerDto
    });
  }

  async remove(id: number) {
    return await this.playerRepository.delete(id);
  }

  async findByEmail(email: string) {
    return await this.playerRepository.findOneBy({email});
  }

  async findLeaderboard() {
    return await this.playerRepository
        .createQueryBuilder()
        .select('id, name, score')
        .orderBy('score', 'DESC')
        .getRawMany();
  }

  async findOpponents(id: number) {
    const player = await this.playerRepository.findOneByOrFail({id});

    return await this.playerRepository
        .createQueryBuilder()
        .select("id, name, score, 'offline' AS status")
        .where('score BETWEEN :minScore AND :maxScore', {
          minScore: player.score - 1000,
          maxScore: player.score + 1000,
        })
        .andWhere('id != :id', {id: player.id})
        .orderBy('score', 'DESC')
        .limit(10)
        .getRawMany();
  }
}
