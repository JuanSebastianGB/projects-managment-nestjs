import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'src/project/project.service';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository } from 'typeorm';
import { TaskDto } from '../dto/task.dto';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    private readonly projectService: ProjectService,
  ) {}

  public async createTask(
    body: TaskDto,
    projectId: string,
  ): Promise<TaskEntity | undefined> {
    try {
      const project = await this.projectService.findProjectById(projectId);
      if (!project)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Project not found',
        });
      const task = await this.tasksRepository.save({ ...body, project });
      return task;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
