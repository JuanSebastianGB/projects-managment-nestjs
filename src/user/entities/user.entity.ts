import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants/roles';
import { IUser } from '../../interfaces/user.interface';
import { UsersProjectsEntity } from './userProject.entity';

import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ unique: true })
  password: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.ADMIN })
  role: ROLES;

  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjectsEntity) => usersProjectsEntity.user,
  )
  projects: UsersProjectsEntity[];
}
