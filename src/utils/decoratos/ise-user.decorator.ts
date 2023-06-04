import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthorizationLoginPayload } from "../base64.converter";

export const idUser = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayload = AuthorizationLoginPayload(authorization);

    return loginPayload?.idUser;
  }
)