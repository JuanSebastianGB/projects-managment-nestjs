import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProjectsEntity } from 'src/user/entities/userProject.entity';
import { UserService } from 'src/user/user.service';
import { ProjectEntity } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UsersProjectsEntity])],
  providers: [ProjectService, UserService],
  controllers: [ProjectController],
})
export class ProjectModule {}
