import { GameProcessed } from './gameProcessed.dto';

export class GameApiResponseProcessed {
  results: GameProcessed[];
  constructor(results: GameProcessed[]) {
    this.results = results;
  }
}
