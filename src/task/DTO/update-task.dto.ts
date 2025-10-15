import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title can`t be an empty' })
  @Length(3, 20, { message: 'Title must be min 3 and max 20 characters' })
  title: string;

  @IsBoolean({ message: 'Status must be a boolean' })
  isCompleted: boolean;
}
