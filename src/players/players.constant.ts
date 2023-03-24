import {Player} from "./entities/player.entity";

type PlayerPropsNotEssentials =
    'id' | 'name' | 'email' | 'password' | 'challengerBattles' |
    'defenderBattles' | 'battleLogActions' | 'battleLogReceivingActions' | 'score';

export const DEFAULT_PLAYER: Omit<Player,  PlayerPropsNotEssentials> =  {
    gold: 10000,
    attack: 200,
    hitPoints: 1000,
    luck: 10,
}