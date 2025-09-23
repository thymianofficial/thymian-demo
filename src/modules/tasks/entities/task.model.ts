import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Todo } from '../../todos/entities/todo.model';

@Table({ tableName: 'tasks' })
export class Task extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;

  @ForeignKey(() => Todo)
  @Column({ type: DataType.INTEGER, allowNull: false })
  todoId: number;

  @BelongsTo(() => Todo)
  todo?: Todo;
}
