import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsString({message: "Name must be a string"})
  @IsNotEmpty({message: "Name cannot be an empty"})
  @MaxLength(22, {message:"Name must be max 22 characters"})
  name: string;

  @IsString({message: "Email must be a string"})
  @IsNotEmpty({message: "Email cannot be an empty"})
  @IsEmail({},{message: 'Incorrect email format'})
  email: string

  @IsString({message: "Password must be a string"})
  @IsNotEmpty({message: "Password cannot be an empty"})
  @MinLength(6, {message:"Password must be min 6 characters"})
  @MaxLength(22, {message:"Password must be max 38 characters"})
  password: string

}