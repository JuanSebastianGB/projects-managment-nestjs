import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { TasksController } from './controllers/tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ProjectEntity])],
  providers: [TasksService, ProjectService],
  controllers: [TasksController],
})
export class TaskModule {}
