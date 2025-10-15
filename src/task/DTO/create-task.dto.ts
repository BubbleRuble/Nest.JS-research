import { IsNotEmpty, IsInt, IsOptional, IsPositive, IsString, Length, IsArray, IsEnum } from "class-validator";

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString({message: 'Title must be a string'})
  @IsNotEmpty({message: 'Title can`t be an empty'})
  @Length(3,20,{message: 'Title must be min 3 and max 20 characters'})
  title: string;

  @IsString({message: 'Description must be a string'})
  @IsOptional()
  description: string;

  @IsInt({message: 'Priority must be a integer'})
  @IsPositive({message: 'Priority must be a positive number'})
  @IsOptional()
  priority: number;

  @IsArray({message: 'tags must be an array'})
  @IsEnum(TaskTag, {each: true, message: 'Invalid tag'})
  @IsOptional()
  tags: TaskTag[]
}
