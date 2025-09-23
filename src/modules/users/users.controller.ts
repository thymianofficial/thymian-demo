import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.model';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ description: 'User was created.', type: User })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto): Promise<Partial<User>> {
      const user = await this.usersService.create(dto);
      return {id: user.id, name: user.name}
  }

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({ description: 'List of users' })
  async findAll(): Promise<Partial<User>[]> {
    const users = await this.usersService.findAll();
    return users.map(u => ({ id: u.id, name: u.name }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'User entity' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Partial<User>> {
    const user = await this.usersService.findOne(id);
    return { id: user.id, name: user.name };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ description: 'Updated user' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: { name?: string; password?: string }): Promise<Partial<User>> {
    const user = await this.usersService.update(id, body);
    return { id: user.id, name: user.name };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: 'User deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
