import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(ROLES)
  @IsNotEmpty()
  @ApiProperty()
  role: ROLES;
}

export class UserToProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  project: ProjectEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accessLevel: ACCESS_LEVEL;
}
