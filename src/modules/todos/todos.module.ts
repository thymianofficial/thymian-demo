import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.model';
import { TodoUser } from './entities/todo-user.model';
import { User } from '../users/entities/user.model';
import { Task } from '../tasks/entities/task.model';
import { UsersModule } from '../users/users.module';
import { BasicAuthGuard } from '../../common/auth/basic-auth.guard';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Todo, TodoUser, User, Task])],
  controllers: [TodosController],
  providers: [TodosService, BasicAuthGuard],
  exports: [SequelizeModule, TodosService],
})
export class TodosModule {}
