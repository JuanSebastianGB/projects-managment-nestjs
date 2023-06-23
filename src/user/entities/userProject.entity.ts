import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../constants/roles';
import { ProjectEntity } from '../../project/entities/project.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ACCESS_LEVEL,
    default: ACCESS_LEVEL.MAINTAINER,
  })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.users)
  project: ProjectEntity;
}
