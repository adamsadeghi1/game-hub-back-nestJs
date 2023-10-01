import { Module } from '@nestjs/common';
import { RawgService } from './services/rawg.service';
import { HttpModule } from '@nestjs/axios';
import { RawgGameController } from './controllers/rawgGame.controller';
import { RawgGenreController } from './controllers/rawgGenre.controller';
import { RawgPlatformController } from './controllers/rawgPlatform.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [
    RawgGameController,
    RawgGenreController,
    RawgPlatformController,
  ],
  providers: [RawgService],
})
export class RawgModule {}
