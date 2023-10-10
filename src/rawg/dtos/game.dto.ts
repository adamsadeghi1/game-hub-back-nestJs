import { Genre } from './genre.dto';
import { Platforms } from './platforms.dto';
import { Publisher } from './publisher.dto';

export class Game {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  background_image: string;
  parent_platforms: Platforms[];
  metacritic: number;
  rating_top: number;
  genres: Genre[];
  publishers: Publisher[];
}
