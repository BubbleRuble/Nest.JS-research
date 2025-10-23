import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMTEzMGQ1LTBiZjctNDczOS05MzU1LTkzTMNmN2MyMWU4ZCIsImlhdCI6MTc2MTIxOTg3MywiZXhwIjoxNzYxMjI3MDczfQ.QVIdETsMVwN4wjgqtuxoNeP42LA6x8NeilfE3ZAIgJs'
  })
  accessToken: string;
}