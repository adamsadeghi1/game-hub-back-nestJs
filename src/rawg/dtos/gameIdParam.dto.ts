import { IsString } from 'class-validator';

export class GameIdParam {
  @IsString()
  id: string;
}
