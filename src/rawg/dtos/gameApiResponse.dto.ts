import { Game } from './game.dto';

export interface GameApiResponse {
  next: string;
  results: Game[];
}
