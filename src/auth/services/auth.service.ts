import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PayloadToken } from 'src/interfaces/auth.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * This function validates a user's login credentials by checking if the username or email exists and
   * if the password matches the stored password.
   * @param {string} username - A string representing the username or email of the user trying to log in.
   * @param {string} password - A string representing the password to be validated.
   * @returns a Promise that resolves to either a UserEntity object or undefined. If no user is found
   * with the given username or email, it returns null.
   */
  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const userByUserName = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    if (userByUserName) {
      const match = await bcrypt.compare(password, userByUserName.password);
      if (match) return userByUserName;
    }
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });
    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }
    return null;
  }

  /**
   * This is a TypeScript function that signs a JSON Web Token (JWT) with a given payload and expiration
   * time.
   * @param  - The `signJwt` function takes in an object with two properties:
   * @returns a JSON Web Token (JWT) signed with the provided payload and expiration time, using the
   * secret key stored in the environment variable `JWT_SECRET`.
   */
  public signJwt({
    payload,
    expires,
  }: {
    payload: jwt.JwtPayload;
    expires: number | string;
  }) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expires,
    });
  }

  /**
   * This function generates a JSON Web Token (JWT) with a payload containing the user's role and ID, and
   * returns the token along with the user's ID and other information.
   * @param {UserEntity}  - The function `generateJwt` takes in a `UserEntity` object as its parameter,
   * which has an `id` property and other properties that are spread into the `rest` object. The function
   * returns a Promise that resolves to an object with an `accessToken` property and a `user` property
   * @returns An object with two properties: "accessToken" and "user". The "accessToken" property
   * contains a JWT token that is signed with a payload containing the user's role and ID, and an
   * expiration time of 1 hour. The "user" property contains an object with the user's ID and the rest of
   * the user's properties (excluding the password).
   */
  public async generateJwt({ id, ...rest }: UserEntity): Promise<any> {
    const user = await this.userService.findUserById(id);
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };
    delete rest.password;
    return {
      accessToken: this.signJwt({ payload, expires: '1h' }),
      user: { id, rest },
    };
  }
}
