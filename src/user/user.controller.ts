import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublicAccessDecorator } from 'src/auth/decorators/public.decorator';
import { RolesDecorator } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto, UserToProjectDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicAccessDecorator()
  @Post()
  async createUser(@Body() body: UserDto) {
    return await this.userService.createUser(body);
  }

  @RolesDecorator('ADMIN')
  @Get()
  public async findUsers() {
    return await this.userService.findUsers();
  }

  @PublicAccessDecorator()
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Post('add-to-project')
  async addToProject(@Body() body: UserToProjectDto) {
    return await this.userService.addToProject(body);
  }
}
