import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.model';
import { Todo } from '../todos/entities/todo.model';
import { BasicAuthGuard } from '../../common/auth/basic-auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Task, Todo])],
  controllers: [TasksController],
  providers: [TasksService, BasicAuthGuard],
  exports: [SequelizeModule, TasksService],
})
export class TasksModule {}
