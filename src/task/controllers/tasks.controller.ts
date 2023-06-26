import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccessLevelDecorator } from 'src/auth/decorators/access-level.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TaskDto } from '../dto/task.dto';
import { TasksService } from '../services/tasks.service';

@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @AccessLevelDecorator('DEVELOPER')
  @Post('project/:projectId')
  async createTask(
    @Body() body: TaskDto,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return await this.taskService.createTask(body, projectId);
  }
}
