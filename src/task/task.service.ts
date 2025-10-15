import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { UpdateTaskDto } from './DTO/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'learn NestJS',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'build API',
      isCompleted: true,
    },
  ];

  getAll() {
    return this.tasks;
  }

  getById(id: number) {
    const task = this.tasks.find(task => task.id === id);

    if(!task) {
      throw new NotFoundException('Task not Found')
    }

    return task;
  }

  create(DTO: CreateTaskDto) {
    const { title, description, priority, tags } = DTO;

    const newTask = {
      id: this.tasks.length + 1,
      title,
      description,
      priority,
      tags,
      isCompleted: false,
    }

    this.tasks.push(newTask)

    return this.tasks; 
  }

  update(id: number, DTO: UpdateTaskDto) {
    const { title, isCompleted } = DTO;

    const task = this.getById(id);

    task.title = title;
    task.isCompleted = isCompleted;

    return task;
  }

  patchUpdate(id: number, DTO: Partial<UpdateTaskDto>) {
    const task = this.getById(id);

    Object.assign(task, DTO);

    return task;
  }

  delete(id: number) {
    const task = this.getById(id);

    this.tasks = this.tasks.filter(t => t.id !== task.id);

    return ['delete success', task ];
  }
}
