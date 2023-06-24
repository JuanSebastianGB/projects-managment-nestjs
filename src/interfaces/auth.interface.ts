import { ROLES } from 'src/constants/roles';

export interface PayloadToken {
  role: ROLES;
  sub: string;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: string;
  exp: string;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
