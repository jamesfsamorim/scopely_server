import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Player} from "../../players/entities/player.entity";
import {BattleLog} from "../../battle_logs/entities/battle.log.entity";

export enum BattleStatus {
    waiting,
    in_progress,
    finished,
}

@Entity('battles')
export class Battle {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, (player) => player.challengerBattles)
    challenger: Player;

    @ManyToOne(() => Player, (player) => player.defenderBattles)
    defender: Player;

    @Column({enum: BattleStatus, default: 0})
    status: BattleStatus;

    @OneToMany(() => BattleLog, (log) => log.battle)
    logs: BattleLog[];

    @CreateDateColumn()
    createdAt: Date;
}