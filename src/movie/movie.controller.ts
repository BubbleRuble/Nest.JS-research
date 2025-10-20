import { Controller, Get, Post, Query, Body, Headers, Req, Res, Param } from '@nestjs/common';
import type { Request, Response } from 'express'
import { MovieService } from './movie.service';
import { CreateMovieDto } from 'src/dto/create-movie.dto';


@Controller('movies') 
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAll() {
    return this.movieService.getAll();
  }

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto)
  }
}


// @Controller('movies')
// export class MovieController {
//   @Get()
//   getAll(@Query() query: any) {
//     return JSON.stringify(query)
//   }

//   @Post()
//   create(@Body() body: {title: string, genre: string}) {
//     return `Movie "${body.title}" was added to ${body.genre} genre`
//   }

//   @Get('headers')
//   getHeaders(@Headers('user-agent') userAgent: string) {
//     return userAgent;
//   }

//   @Get('request') 
//   getRequestDetails(@Req() req: Request) {
//     return {
//       method: req.method,
//       url: req.url,
//       headers: req.headers,
//       query: req.query,
//       params: req.params,
//     };
//   }

//   @Get('response') 
//   getResponceDetails(@Res() res: Response) {
//     res.status(201).json({message: 'Hello mr. sir'})
//   }

//   @Get(':id')
//   findById(@Param('id') id: string) {
//     return {id};
//   }
// }
