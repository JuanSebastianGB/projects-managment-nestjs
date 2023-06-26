import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASKS } from 'src/constants/status-task';
import { ProjectDto } from 'src/project/dto/project.dto';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsEnum(STATUS_TASKS)
  @IsOptional()
  status: STATUS_TASKS;

  @IsNotEmpty()
  @IsString()
  responsibleName: string;

  @IsOptional()
  project: ProjectDto;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  taskName: string;
  @IsOptional()
  @IsString()
  taskDescription: string;
  @IsEnum(STATUS_TASKS)
  @IsOptional()
  status: STATUS_TASKS;
}
