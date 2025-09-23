import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { BasicAuthGuard } from '../../common/auth/basic-auth.guard';

@ApiTags('tasks')
@ApiBasicAuth()
@Controller('todos/:todoId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(BasicAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Task zu einem Todo hinzufügen (authentifiziert)' })
  @ApiCreatedResponse({ description: 'Task erstellt' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('todoId', ParseIntPipe) todoId: number, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(todoId, dto);
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Alle Tasks eines Todos auflisten (authentifiziert)' })
  @ApiOkResponse({ description: 'Liste von Tasks' })
  async findAll(@Param('todoId', ParseIntPipe) todoId: number) {
    return this.tasksService.findAll(todoId);
  }

  @UseGuards(BasicAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Einen Task eines Todos abrufen (authentifiziert)' })
  @ApiOkResponse({ description: 'Task gefunden' })
  async findOne(@Param('todoId', ParseIntPipe) todoId: number, @Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(todoId, id);
  }

  @UseGuards(BasicAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Task aktualisieren (authentifiziert)' })
  @ApiOkResponse({ description: 'Task aktualisiert' })
  async update(
    @Param('todoId', ParseIntPipe) todoId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title?: string; description?: string },
  ) {
    return this.tasksService.update(todoId, id, body);
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Task löschen (authentifiziert)' })
  @ApiOkResponse({ description: 'Task gelöscht' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('todoId', ParseIntPipe) todoId: number, @Param('id', ParseIntPipe) id: number) {
    await this.tasksService.remove(todoId, id);
  }
}
