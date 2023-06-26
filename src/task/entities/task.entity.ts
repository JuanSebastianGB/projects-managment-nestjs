import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { STATUS_TASKS } from '../../constants/status-task';
import { ITask } from '../../interfaces/task.interface';
import { ProjectEntity } from '../../project/entities/project.entity';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity implements ITask {
  @Column()
  taskName: string;
  @Column()
  taskDescription: string;
  @Column({ type: 'enum', enum: STATUS_TASKS, default: STATUS_TASKS.CREATED })
  status: STATUS_TASKS;
  @Column()
  responsibleName: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({ name: 'project_Id' })
  project: ProjectEntity;
}
