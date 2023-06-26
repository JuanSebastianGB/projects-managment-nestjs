import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASKS } from 'src/constants/status-task';
import { ProjectDto } from 'src/project/dto/project.dto';

export class TaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @ApiProperty()
  @IsEnum(STATUS_TASKS)
  @IsOptional()
  status: STATUS_TASKS;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsibleName: string;

  @ApiProperty()
  @IsOptional()
  project: ProjectDto;
}

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  taskName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  taskDescription: string;
  @ApiProperty()
  @IsEnum(STATUS_TASKS)
  @IsOptional()
  status: STATUS_TASKS;
}
