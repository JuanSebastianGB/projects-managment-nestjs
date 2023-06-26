import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { TaskEntity } from '../../task/entities/task.entity';
import { UsersProjectsEntity } from '../../user/entities/userProject.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjectsEntity) => usersProjectsEntity.project,
  )
  users: UsersProjectsEntity[];

  @OneToMany(() => TaskEntity, (tasks) => tasks.project)
  tasks: TaskEntity[];
}
