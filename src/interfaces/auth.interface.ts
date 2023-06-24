import { ROLES } from 'src/constants/roles';

export interface PayloadToken {
  role: ROLES;
  sub: string;
}

export interface AuthBody {
  username: string;
  password: string;
}
