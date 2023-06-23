import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ROLES } from 'src/constants/roles';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEnum(ROLES)
  @IsOptional()
  role: ROLES;
}
