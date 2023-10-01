import { Controller, Get } from '@nestjs/common';
import { RawgService } from '../services/rawg.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from '../dtos/genre.dto';

@ApiTags('Rawg')
@Controller('api/genres')
export class RawgGenreController {
  constructor(private readonly rawgService: RawgService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'list of Genre', type: [Genre] })
  async getAllGenres() {
    return this.rawgService.getGenresAsync('genres');
  }
}
