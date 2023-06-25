import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';

export const AdminAccessDecorator = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
