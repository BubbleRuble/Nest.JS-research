import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './DTO/create-task.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';


@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  getAll() {
    return this.taskService.getAll()
  }

  @Get('by-id/:id') 
  getById(@Param('id') id: string) {
    return this.taskService.getById(+id)
  }

  @Post()
  create(@Body() DTO: CreateTaskDto) {
    return this.taskService.create(DTO);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() DTO: UpdateTaskDto) {
    return this.taskService.update(+id,DTO)
  }

  @Patch(':id')
  patchUpdate(@Param('id') id: string, @Body() DTO: Partial<UpdateTaskDto>) {
    return this.taskService.patchUpdate(+id, DTO)
  }

  @Delete(':id') 
  delete(@Param('id') id: string) {
    return this.taskService.delete(+id)
  }
}
