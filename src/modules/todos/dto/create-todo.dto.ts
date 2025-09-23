import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Shopping', description: 'Title of the todo' })
  title!: string;

  @ApiProperty({ example: 'Milk, Bread, Eggs', required: false })
  description?: string;
}
