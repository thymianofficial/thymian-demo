import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards, Req, Patch, Delete } from '@nestjs/common';
import { ApiBasicAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AddParticipantsDto } from './dto/add-participants.dto';
import { BasicAuthGuard } from '../../common/auth/basic-auth.guard';

@ApiTags('todos')
@ApiBasicAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(BasicAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new todo (authenticated)' })
  @ApiCreatedResponse({ description: 'Todo created' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: any, @Body() dto: CreateTodoDto) {
    const user = req.user;
    return this.todosService.create(user.id, dto);
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  @ApiOperation({ summary: 'List todos (authenticated)' })
  @ApiOkResponse({ description: 'List of todos' })
  async findAll() {
    return this.todosService.findAll();
  }

  @UseGuards(BasicAuthGuard)
  @Post(':id/participants')
  @ApiOperation({ summary: 'Add participants to a todo (authenticated)' })
  @ApiOkResponse({ description: 'Participants added' })
  async addParticipants(@Param('id', ParseIntPipe) id: number, @Body() dto: AddParticipantsDto) {
    await this.todosService.addParticipants(id, dto.userIds ?? []);
    return { success: true };
  }

  @UseGuards(BasicAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a todo with participants and tasks (authenticated)' })
  @ApiOkResponse({ description: 'Todo found' })
  async get(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.findOneWithRelations(id);
    return todo;
  }

  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo (authenticated)' })
  @ApiOkResponse({ description: 'Updated todo' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: { title?: string; description?: string }) {
    return this.todosService.update(id, body);
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo (authenticated)' })
  @ApiOkResponse({ description: 'Todo deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.todosService.remove(id);
  }
}
