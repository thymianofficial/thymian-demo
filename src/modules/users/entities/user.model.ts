import { Column, HasMany, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Todo } from '../../todos/entities/todo.model';
import { TodoUser } from '../../todos/entities/todo-user.model';

@Table({ tableName: 'users' })
export class User extends Model {

  @Column({ unique: true, allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare password: string; // For demo: store plain text (not for production)

  @HasMany(() => Todo, 'creatorId')
  declare createdTodos?: Todo[];

  @BelongsToMany(() => Todo, () => TodoUser)
  declare todos?: Todo[];
}
