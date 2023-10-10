import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GameQueryParamDto } from '../dtos/gameQueryParam.dto';
import { HttpService } from '@nestjs/axios';
import { GameApiResponse } from '../dtos/gameApiResponse.dto';
import { GameApiResponseProcessed } from '../dtos/gameApiResponseProcessed.dto';
import { Observable, map } from 'rxjs';
import { GenreApiResponse } from '../dtos/genreApiResponse.dto';
import { PlatformResponse } from '../dtos/platformResponse.dto';
import { Genre } from '../dtos/genre.dto';
import { Platform } from '../dtos/platform.dto';
import { GameFinalResult } from '../dtos/gameFinalResult.dto';
import { Game } from '../dtos/game.dto';
import { TrailerApiResponse } from '../dtos/trailerApiResponse.dto';
import { Trailer } from '../dtos/trailer.dto';

@Injectable()
export class RawgService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private readonly BASE_URL = this.configService.get('BASE_URL');
  private readonly API_KEY = this.configService.get('RAWG_API_KEY');

  getGamesAsync(
    url: string,
    gameQueryParam: GameQueryParamDto,
  ): Observable<GameFinalResult> {
    console.log(`Reading Data from ${url} end-point`);
    const fullUrl = this.getFullUrl(url);
    const queryParams = {
      params: {
        genres: gameQueryParam?.genres,
        parent_platforms: gameQueryParam?.parent_platforms,
        ordering: gameQueryParam?.ordering,
        search: gameQueryParam?.search,
        page: gameQueryParam?.page,
      },
    };

    return this.httpService.get<GameApiResponse>(fullUrl, queryParams).pipe(
      map((response) => {
        const procesdResult = this.processGameResult(response.data);
        return { next: procesdResult.next, results: procesdResult.results };
      }),
    );
  }

  getGameAsync(url, id: number | string) {
    console.log(`Reading Data from ${url} end-point`);
    const fullUrl = this.getFullUrl(url, id);
    console.log(fullUrl);
    return this.httpService.get<Game>(fullUrl).pipe(
      map((response) => {
        return {
          id: response.data.id,
          slug: response.data.slug,
          name: response.data.name,
          description_raw: response.data.description_raw,
          parent_platforms: this.getPlatforms(response.data),
          background_image: response.data.background_image,
          metacritic: response.data.metacritic,
          rating_top: response.data.rating_top,
          genres: response.data.genres,
          publishers: response.data.publishers
        };
      }),
    );
  }

  getGameTrailers(url:string,id: string | number){
    console.log(`Reading Data from ${url} end-point`);
    const fullUrl = this.getFullUrl(url+'/'+id+"/movies");
    return this.httpService.get<TrailerApiResponse>(fullUrl).pipe(
      map(res=> res.data.results.length >0 ? res.data.results[0]: {})
    )
  }

  getGenresAsync(url: string): Observable<Genre[]> {
    console.log(`Reading Data from ${url} end-point`);
    const fullUrl = this.getFullUrl(url);
    return this.httpService.get<GenreApiResponse>(fullUrl).pipe(
      map((res) => {
        return res.data.results.map((genre) => ({
          id: genre.id,
          name: genre.name,
          slug: genre.slug,
          games_count: genre.games_count,
          image_background: genre.image_background,
        }));
      }),
    );
  }

  getParentPlatformAsync(url: string): Observable<Platform[]> {
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

  private getFullUrl(url: string, param?: string | number) {
    if (param !== undefined)
      return `${this.BASE_URL}/${url}/${param}?key=${this.API_KEY}`;
    return `${this.BASE_URL}/${url}?key=${this.API_KEY}`;
  }

  private getPlatforms(game:Game){
    return game.parent_platforms
    ? game.parent_platforms.map((platforms) => platforms.platform)
    : [];
  }
  private processGameResult(response: GameApiResponse) {
    const gameProcessedList = response.results.map((game) => {
      const platforms = this.getPlatforms(game);

      return {
        id: game.id,
        slug: game.slug,
        name: game.name,
        background_image: game.background_image,
        parent_platforms: platforms,
        metacritic: game.metacritic,
        rating_top: game.rating_top,
      };
    });
    const pageIndexInNext = response.next
      ? response.next.indexOf('page=')
      : null;
    const next = pageIndexInNext ? response.next.slice(pageIndexInNext) : null;

    return new GameApiResponseProcessed(gameProcessedList, next);
  }
}
