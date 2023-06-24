import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { IUseToken } from 'src/interfaces/auth.interface';
import { UserService } from 'src/user/user.service';
import { useToken } from 'src/utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
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

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['authorization'];
    if (!token || Array.isArray(token))
      throw new UnauthorizedException('Invalid token');

    const manageToken: IUseToken | string = useToken(token);
    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);

    if (manageToken.isExpired) throw new UnauthorizedException('Token expired');
    const { sub } = manageToken;

    const user = await this.userService.findUserById(sub);
    if (!user) throw new UnauthorizedException('User not found');

    req.userId = user.id;
    req.userRole = user.role;
    return true;
  }
}
