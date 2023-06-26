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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessLevelDecorator } from 'src/auth/decorators/access-level.decorator';
import { RolesDecorator } from 'src/auth/decorators/roles.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @RolesDecorator('CREATOR')
  @Post('owner/:ownerId')
  public async createProject(
    @Param('ownerId', ParseUUIDPipe) ownerId: string,
    @Body() body: ProjectDto,
  ) {
    return await this.projectService.createProject(body, ownerId);
  }

  @Get()
  public async findProjects() {
    return await this.projectService.findProjects();
  }

  @AccessLevelDecorator('OWNER')
  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.findProjectById(id);
  }

  @AccessLevelDecorator('OWNER')
  @Put(':projectId')
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProjectDto,
  ) {
    return await this.projectService.updateProject(id, body);
  }

  @AccessLevelDecorator('OWNER')
  @Delete(':projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.deleteProject(id);
  }
}
