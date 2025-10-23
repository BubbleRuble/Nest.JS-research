import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: 'Actual name',
    example: 'Petro Ocheret`ko',
    maxLength: 22,
  })
  @IsString({message: "Name must be a string"})
  @IsNotEmpty({message: "Name cannot be an empty"})
  @MaxLength(22, {message:"Name must be max 22 characters"})
  name: string;

  @ApiProperty({
    description: 'Post address',
    example: 'petyaroshen228@mail.com'
  })
  @IsString({message: "Email must be a string"})
  @IsNotEmpty({message: "Email cannot be an empty"})
  @IsEmail({},{message: 'Incorrect email format'})
  email: string


  @ApiProperty({
    description: 'User password',
    example: 'petyashokolad123456',
    minLength: 6,
    maxLength: 38,
  })
  @IsString({message: "Password must be a string"})
  @IsNotEmpty({message: "Password cannot be an empty"})
  @MinLength(6, {message:"Password must be min 6 characters"})
  @MaxLength(38, {message:"Password must be max 38 characters"})
  password: string

}