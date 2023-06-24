import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  public async createProject(@Body() body: ProjectDto) {
    return await this.projectService.createProject(body);
  }

  @Get()
  public async findProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':id')
  public async findProjectById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.findProjectById(id);
  }

  @Put(':id')
  public async updateProject(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProjectDto,
  ) {
    return await this.projectService.updateProject(id, body);
  }

  @Delete(':id')
  public async deleteProject(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.projectService.deleteProject(id);
  }
}
