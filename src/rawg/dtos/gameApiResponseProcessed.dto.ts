import { GameProcessed } from './gameProcessed.dto';

export class GameApiResponseProcessed {
  next: string;
  results: GameProcessed[];
  constructor(results: GameProcessed[], next: string) {
    this.results = results;
    this.next = next;
  }
}
