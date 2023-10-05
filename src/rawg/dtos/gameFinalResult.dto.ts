import { GameProcessed } from "./gameProcessed.dto";

export class GameFinalResult {
    next: string | null;
    results: GameProcessed[]
}