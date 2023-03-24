import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Battle} from "../../battles/entities/battle.entity";
import {BattleLog} from "../../battle_logs/entities/battle.log.entity";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20, unique: true})
    name: string;

    @Column({type: "decimal", precision: 12, scale: 2})
    gold: number;

    @Column({type: "float"})
    attack: number;

    @Column({type: "float"})
    hitPoints: number;

    @Column({type: "float"})
    luck: number;

    @Column({type: "float", default: 0})
    score: number;

    @Column({unique: true})
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @OneToMany(() => Battle, (battle) => battle.challenger)
    challengerBattles?: Battle[];

    @OneToMany(() => Battle, (battle) => battle.defender)
    defenderBattles?: Battle[];

    @OneToMany(() => BattleLog, (log) => log.actionPlayer)
    battleLogActions?: BattleLog[];

    @OneToMany(() => BattleLog, (log) => log.receivingPlayer)
    battleLogReceivingActions?: BattleLog[];
}