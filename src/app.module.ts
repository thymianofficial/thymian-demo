import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from './modules/todos/todos.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      database: 'test',
      storage: process.env.DATABASE_FILE || 'db.sqlite',
      autoLoadModels: true,
      synchronize: true,
      models: [],
      logging: false,
    }),
    UsersModule,
    TodosModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
