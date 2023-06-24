import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto, UserToProjectDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersProjectsEntity } from './entities/userProject.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) {}

  public async createUser(body: UserDto): Promise<UserEntity> {
    try {
      body.password = await bcrypt.hash(
        body.password,
        +process.env.SALT_ROUNDS,
      );
      const user: UserEntity = await this.userRepository.save(body);
      if (!user)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'was not possible to create the user',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      if (users.length === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      return await this.userRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<UserEntity | undefined> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projects', 'projects')
        .leftJoinAndSelect('projects.project', 'project')
        .getOne();
      if (!user)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    id: string,
    body: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'was not possible to update the user',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'was not possible to delete the user',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async addToProject(body: UserToProjectDto) {
    try {
      return await this.userProjectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({
    key,
    value,
  }: {
    key: keyof UserDto;
    value: any;
  }): Promise<UserEntity | undefined> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
