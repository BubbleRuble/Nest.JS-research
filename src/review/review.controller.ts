import {Controller,Get,Post,Query,Body,Headers,Req,Res,Param,Patch,Put,Delete,} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from 'src/dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getAll() {
    return this.reviewService.getAll();
  }

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  // @Get(':id')
  // getById(@Param('id') id: string) {
  //   return this.reviewService.getById(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() dto: CreateMovieDto) {
  //   return this.reviewService.update(id, dto);
  // }

  // @Delete(':id') 
  // delete(@Param('id') id: string) {
  //   return this.reviewService.delete(id)
  // }
}
