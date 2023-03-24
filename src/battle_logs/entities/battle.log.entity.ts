import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Battle} from "../../battles/entities/battle.entity";
import {Player} from "../../players/entities/player.entity";

@Entity('battle_logs')
export class BattleLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Battle, (battle) => battle.logs)
    battle: Battle;

    @ManyToOne(() => Player, (player) => player.battleLogActions)
    actionPlayer: Player;

    @ManyToOne(() => Player, (player) => player.battleLogReceivingActions)
    receivingPlayer: Player;

    @Column({type: "text"})
    action_resolution_description: string;

    @CreateDateColumn()
    createdAt: Date;
}