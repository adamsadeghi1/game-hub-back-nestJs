import { IsString } from 'class-validator';

export class GameQueryParamDto {
  @IsString()
  genres?: string;

  @IsString()
  platforms?: string;

  @IsString()
  ordering?: string;

  @IsString()
  search?: string;
}
