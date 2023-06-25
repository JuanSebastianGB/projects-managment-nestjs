import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const accessLevel = this.reflector.get<number>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest<Request>();

    const { userRole, userId } = req;

    if (accessLevel === undefined)
      if (roles === undefined) {
        if (!admin) return true;
        else if (admin && userRole === admin) return true;
        else throw new UnauthorizedException('Not authorized user');
      }

    if (userRole === ROLES.ADMIN) return true;

    const user = await this.userService.findUserById(userId);

    const userExistInProject = user.projects.find((project) => {
      return project.project.id === req.params.projectId;
    });

    if (userExistInProject === undefined) {
      throw new UnauthorizedException(
        'You are not authorized to access this project.',
      );
    }

    if (accessLevel !== userExistInProject.accessLevel)
      throw new UnauthorizedException(
        'You are not authorized to access this project',
      );

    return true;
  }
}
