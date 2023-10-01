import { Controller, Get } from '@nestjs/common';
import { RawgService } from '../services/rawg.service';

@Controller('api/genres')
export class RawgGenreController {
  constructor(private readonly rawgService: RawgService) {}

  @Get()
  async getAllGenres() {
    return this.rawgService.getGenresAsync('genres');
  }
}
