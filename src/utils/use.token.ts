import * as jwt from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from 'src/interfaces/auth.interface';

/**
 * The function checks if a given token expiration date has passed.
 * @param {string | number} exp - The `exp` parameter is a string or number representing the expiration
 * time of a token. It is typically a Unix timestamp, which is the number of seconds that have elapsed
 * since January 1, 1970, 00:00:00 UTC.
 * @returns A boolean value indicating whether the expiration time of a token (represented as a string
 * or number) has passed or not.
 */
const checkIsExpiredToken = (exp: string | number): boolean => {
  return +new Date(exp) <= +new Date() / 1000;
};

/**
 * This function takes a token as input, decodes it, and returns either an object with the decoded
 * token information or an error message if the token is invalid.
 * @param {string} token - The `token` parameter is a string representing a JSON Web Token (JWT) that
 * needs to be decoded and validated.
 * @returns The `useToken` function returns either a string or an object of type `IUseToken`. If the
 * token is invalid or cannot be decoded, the function returns the string `'Invalid token'`. If the
 * token is valid, the function returns an object with properties `sub` (subject), `role`, and
 * `isExpired`. The `isExpired` property is a boolean value indicating whether the
 */
export const useToken = (token: string): string | IUseToken => {
  try {
    const decodedToken = jwt.decode(token) as unknown as AuthTokenResult | null;
    if (!decodedToken) return 'Invalid token';
    const { sub, role, exp } = decodedToken;
    return {
      sub,
      role,
      isExpired: checkIsExpiredToken(exp),
    };
  } catch (error) {
    return 'Invalid token';
  }
};
