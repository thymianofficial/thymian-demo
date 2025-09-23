import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './entities/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { User } from '../users/entities/user.model';
import { TodoUser } from './entities/todo-user.model';
import { Task } from '../tasks/entities/task.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo) private readonly todoModel: typeof Todo,
    @InjectModel(TodoUser) private readonly todoUserModel: typeof TodoUser,
  ) {}

  async create(creatorId: number, dto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create({ title: dto.title, description: dto.description, creatorId });
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async update(id: number, data: Partial<Pick<Todo, 'title' | 'description'>>): Promise<Todo> {
    const todo = await this.findOne(id);
    await todo.update({ title: data.title ?? todo.title, description: data.description ?? todo.description });
    return todo;
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await todo.destroy();
  }

  async addParticipants(todoId: number, userIds: number[]): Promise<void> {
    const todo = await this.todoModel.findByPk(todoId);
    if (!todo) throw new NotFoundException('Todo not found');
    const pairs = userIds.map((userId) => ({ todoId, userId }));
    // upsert: simplistic approach - create ignores duplicates
    for (const p of pairs) {
      await this.todoUserModel.findOrCreate({ where: p, defaults: p });
    }
  }

  async findOneWithRelations(id: number): Promise<Todo | null> {
    return this.todoModel.findByPk(id, {
      include: [
        { model: User, as: 'participants' },
        { model: User, as: 'creator' },
        { model: Task },
      ],
    });
  }
}
