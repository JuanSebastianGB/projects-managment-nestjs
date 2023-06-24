import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBody } from 'src/interfaces/auth.interface';

export class AuthLoginDto implements AuthBody {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
