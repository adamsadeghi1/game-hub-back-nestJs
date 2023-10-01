import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GameQueryParamDto } from '../dtos/gameQueryParam.dto';
import { HttpService } from '@nestjs/axios';
import { GameApiResponse } from '../dtos/gameApiResponse.dto';
import { GameApiResponseProcessed } from '../dtos/gameApiResponseProcessed.dto';
import { map } from 'rxjs';
import { GenreApiResponse } from '../dtos/genreApiResponse.dto';
import { PlatformResponse } from '../dtos/platformResponse.dto';

@Injectable()
export class RawgService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private readonly BASE_URL = this.configService.get('BASE_URL');
  private readonly API_KEY = this.configService.get('RAWG_API_KEY');

  getGamesAsync(url: string, gameQueryParam: GameQueryParamDto) {
    console.log(`Reading Data from ${url} end-point`);
    const fullUrl = `${this.BASE_URL}/${url}?key=${this.API_KEY}&page=1`;
    const queryParams = {
      params: {
        genres: gameQueryParam?.genres,
        platforms: gameQueryParam?.platforms,
        ordering: gameQueryParam?.ordering,
        search: gameQueryParam?.search,
      },
    };

    return this.httpService.get<GameApiResponse>(fullUrl, queryParams).pipe(
      map((response) => {
        return this.processGameResult(response.data).results;
      }),
    );
  }

  getGenresAsync(url: string) {
    console.log(`Reading Data from ${url} end-point`);
    const fullUrl = `${this.BASE_URL}/${url}?key=${this.API_KEY}`;
    return this.httpService.get<GenreApiResponse>(fullUrl).pipe(
      map((res) => {
        return res.data.results.map((genre) => ({
          id: genre.id,
          name: genre.name,
          slug: genre.slug,
          count: genre.count,
          image_background: genre.image_background,
        }));
      }),
    );
  }

  getParentPlatformAsync(url: string) {
    console.log(`Reading Data from ${url} end-point`);
    const fullUrl = this.getFullUrl(url);
    return this.httpService.get<PlatformResponse>(fullUrl).pipe(
      map((res) => {
        return res.data.results.map((platform) => ({
          id: platform.id,
          name: platform.name,
          slug: platform.slug,
        }));
      }),
    );
  }

  private getFullUrl(url: string) {
    return `${this.BASE_URL}/${url}?key=${this.API_KEY}`;
  }
  private processGameResult(response: GameApiResponse) {
    const gameProcessedList = response.results.map((game) => {
      const platforms = game.parent_platforms.map(
        (platforms) => platforms.platform,
      );

      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        parent_platforms: platforms,
        metacritic: game.metacritic,
        rating_top: game.rating_top,
      };
    });
    return new GameApiResponseProcessed(gameProcessedList);
  }
}
