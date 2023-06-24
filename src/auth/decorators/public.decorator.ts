import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/constants/key-decorators';

export const PublicAccessDecorator = () => SetMetadata(PUBLIC_KEY, true);
