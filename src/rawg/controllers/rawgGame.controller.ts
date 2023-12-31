import { Controller, Get, Param, Query } from '@nestjs/common';
import { RawgService } from '../services/rawg.service';
import { GameQueryParamDto } from '../dtos/gameQueryParam.dto';
import { ApiTags } from '@nestjs/swagger';
import { GameIdParam } from '../dtos/gameIdParam.dto';

@ApiTags('Rawg')
@Controller('api/games')
export class RawgGameController {
  constructor(private readonly rawgService: RawgService) {}

  @Get()
  async getAllGames(@Query() gameQueryParams: GameQueryParamDto) {
    return this.rawgService.getGamesAsync('games', gameQueryParams);
  }

  @Get(':id')
  async getGame(@Param() param: GameIdParam) {
    return this.rawgService.getGameAsync('games', param.id);
  }

  @Get(':id/movie')
  async getGameTrailer(@Param() param: GameIdParam) {
    return this.rawgService.getGameTrailers('games', param.id);
  }

  @Get(':id/screenshots')
  async getGameScreenshots(@Param() param: GameIdParam) {
    return this.rawgService.getGameScreenShots('games', param.id);
  }


}
