import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type ResponseWithJWT = Request & { locals: { jwt: string } };

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse<ResponseWithJWT>();
    return response.locals.jwt;
  },
);

