import { Platform } from './platform.dto';

export class GameProcessed {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: Platform[];
  metacritic: number;
  rating_top: number;
}
