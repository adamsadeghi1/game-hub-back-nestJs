import { IsNumber, IsString } from "class-validator";

export class Genre {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  slug: string;
  @IsNumber()
  count: number;
  @IsString()
  image_background: string;
}
