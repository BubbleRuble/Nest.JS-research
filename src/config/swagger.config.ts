import { DocumentBuilder } from "@nestjs/swagger";

export function getSwaggerConfig () {
  return new DocumentBuilder()
  .setTitle('Nest course API')
    .setDescription('A s1mple and powerful REST API built with NestJS')
    .addBearerAuth()
    .build();
}