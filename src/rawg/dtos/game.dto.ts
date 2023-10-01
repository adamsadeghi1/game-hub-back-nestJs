import { Platforms } from './platforms.dto';

export class Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: Platforms[];
  metacritic: number;
  rating_top: number;
}
