import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'alice', description: 'user name' })
  name!: string;

  @ApiProperty({ example: 'secret', description: 'password in plain test' })
  password!: string;
}
