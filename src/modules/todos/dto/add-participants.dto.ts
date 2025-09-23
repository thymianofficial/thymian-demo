import { ApiProperty } from '@nestjs/swagger';

export class AddParticipantsDto {
  @ApiProperty({ example: [1, 2], description: 'IDs of users to add to the todo' })
  userIds!: number[];
}
