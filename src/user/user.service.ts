import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(body: UserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.save(body);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getUserById(id: string): Promise<UserEntity | undefined> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUser(
    id: string,
    body: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) return undefined;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) return undefined;
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
