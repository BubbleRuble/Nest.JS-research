import { IsNotEmpty, IsString, IsNumber, Min, Max } from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'Рейтинг повинен бути числом з максимум 1 десятковим знаком' })
  @Min(1, { message: 'Рейтинг не може бути менше 1' })
  @Max(10, { message: 'Рейтинг не може бути більше 10' })
  rating: number;

  @IsString()
  @IsNotEmpty()
  movieId: string

}