import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

type RequestWithUser = Request & { user: JoinRequestDto };

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JoinRequestDto => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);