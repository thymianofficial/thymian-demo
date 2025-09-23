import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from '../../users/entities/user.model';
import { Task } from '../../tasks/entities/task.model';
import { TodoUser } from './todo-user.model';

@Table({ tableName: 'todos' })
export class Todo extends Model {
  @Column({ allowNull: false })
  declare title: string;

  @Column({ allowNull: true })
  declare description?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare creatorId: number;

  @BelongsTo(() => User, 'creatorId')
  declare creator?: User;

  @HasMany(() => Task)
  declare tasks?: Task[];

  @BelongsToMany(() => User, () => TodoUser)
  declare participants?: User[];
}
