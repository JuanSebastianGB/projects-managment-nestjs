import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY } from 'src/constants/key-decorators';

export const AccessLevelDecorator = (level: number) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);