import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {DEFAULT_PLAYER} from "./players.constant";
import {AuthGuard} from "@nestjs/passport";

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    const newPlayer = {...createPlayerDto, ...DEFAULT_PLAYER};
    return this.playersService.create(newPlayer);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('leaderboard')
  findLeaderboard() {
    return this.playersService.findLeaderboard();
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('leaderboard')
  // findOpponents() {
  //   return this.playersService.findOpponents();
  // }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.playersService.remove(id);
  }
}
