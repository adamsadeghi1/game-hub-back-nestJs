import { Controller, Get, Query } from '@nestjs/common';
import { RawgService } from '../services/rawg.service';
import { GameQueryParamDto } from '../dtos/gameQueryParam.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rawg')
@Controller('api/games')
export class RawgGameController {
  constructor(private readonly rawgService: RawgService) {}

  @Get()
  async getAllGames(@Query() gameQueryParams: GameQueryParamDto) {
    return this.rawgService.getGamesAsync('games', gameQueryParams);
  }
}
