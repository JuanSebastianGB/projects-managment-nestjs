import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  public async createProject(body: ProjectDto): Promise<ProjectEntity> {
    try {
      const project: ProjectEntity = await this.projectRepository.save(body);
      if (!project)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'was not possible to create the project',
        });
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findProjects(): Promise<ProjectEntity[]> {
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find();

      if (projects.length === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No projects found',
        });
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<ProjectEntity | undefined> {
    try {
      const project: ProjectEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.users', 'users')
        .leftJoinAndSelect('users.user', 'user')
        .getOne();
      if (!project)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Project not found',
        });
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProject(
    id: string,
    body: UpdateProjectDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (project.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'was not possible to update the project',
        });
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'was not possible to delete the project',
        });
      return project;
    } catch (error) {}
  }
}
