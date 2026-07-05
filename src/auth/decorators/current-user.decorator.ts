import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

export interface JwtUser {
  userId: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtUser => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
