import { Table, Column, DataType, Model, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/entities/user.model';
import { Todo } from './todo.model';

@Table({ tableName: 'todo_users' })
export class TodoUser extends Model {
  @ForeignKey(() => Todo)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare todoId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare userId: number;
}
