import { Controller, Get } from '@nestjs/common';
import { RawgService } from '../services/rawg.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rawg')
@Controller('api/platforms')
export class RawgPlatformController {
  constructor(private readonly rawgService: RawgService) {}

  @Get()
  async getParentPlatforms() {
    return this.rawgService.getParentPlatformAsync('platforms/lists/parents');
  }
}
