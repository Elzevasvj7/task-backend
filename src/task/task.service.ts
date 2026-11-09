import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTaskDto, Task, UpdateTaskDto } from './task.interface.js';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: this.nextId++,
      title: dto.title,
      description: dto.description ?? '',
      completed: false,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, dto);
    return task;
  }

  remove(id: number): Task {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter((item) => item.id !== id);
    return task;
  }
}
