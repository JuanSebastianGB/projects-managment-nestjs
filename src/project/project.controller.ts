import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessLevelDecorator } from 'src/auth/decorators/access-level.decorator';
import { RolesDecorator } from 'src/auth/decorators/roles.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  public async createProject(@Body() body: ProjectDto) {
    return await this.projectService.createProject(body);
  }

  @RolesDecorator('ADMIN')
  @Get()
  public async findProjects() {
    return await this.projectService.findProjects();
  }

  @AccessLevelDecorator(50)
  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.findProjectById(id);
  }

  @AccessLevelDecorator(50)
  @Put(':projectId')
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProjectDto,
  ) {
    return await this.projectService.updateProject(id, body);
  }

  @Delete(':projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.deleteProject(id);
  }
}
