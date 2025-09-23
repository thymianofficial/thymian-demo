import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy milk' })
  title!: string;

  @ApiProperty({ example: 'Whole milk 3.5%', required: false })
  description?: string;
}
