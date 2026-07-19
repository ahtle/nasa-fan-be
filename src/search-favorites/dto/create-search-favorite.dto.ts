import { IsString, MinLength } from "class-validator";

export class CreateSearchFavoriteDto {
  @IsString()
  @MinLength(1)
  nasaId!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  dateCreated!: string;

  @IsString()
  thumbnailUrl!: string;

  @IsString()
  imageUrl!: string;
}
