import { IsInt, IsNotEmpty, IsString, Max, Min, IsArray } from "class-validator";

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsArray()                
  @IsString({ each: true }) 
  actorIds: string[];

  @IsString()
  imageUrl: string;
}