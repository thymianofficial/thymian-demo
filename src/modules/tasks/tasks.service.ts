import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Todo } from '../todos/entities/todo.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task, @InjectModel(Todo) private readonly todoModel: typeof Todo) {}

  async create(todoId: number, dto: CreateTaskDto): Promise<Task> {
    const todo = await this.todoModel.findByPk(todoId);
    if (!todo) throw new NotFoundException('Todo not found');
    return this.taskModel.create({ title: dto.title, description: dto.description, todoId });
  }

  async findAll(todoId: number): Promise<Task[]> {
    return this.taskModel.findAll({ where: { todoId } });
  }

  async findOne(todoId: number, id: number): Promise<Task> {
    const task = await this.taskModel.findOne({ where: { id, todoId } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(todoId: number, id: number, data: Partial<Pick<Task, 'title' | 'description'>>): Promise<Task> {
    const task = await this.findOne(todoId, id);
    await task.update({ title: data.title ?? task.title, description: data.description ?? task.description });
    return task;
  }

  async remove(todoId: number, id: number): Promise<void> {
    const task = await this.findOne(todoId, id);
    await task.destroy();
  }
}
