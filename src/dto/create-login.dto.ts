import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class LoginRequestDto {
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