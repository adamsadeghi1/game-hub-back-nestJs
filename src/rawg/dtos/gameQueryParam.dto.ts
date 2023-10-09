import { IsString } from 'class-validator';

export class GameQueryParamDto {
  @IsString()
  genres?: string;

  @IsString()
  parent_platforms?: string;

  @IsString()
  ordering?: string;

  @IsString()
  search?: string;

  @IsString()
  page?: string;
}
