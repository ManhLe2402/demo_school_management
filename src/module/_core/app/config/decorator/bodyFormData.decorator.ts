import { ExecutionContext, createParamDecorator } from "@nestjs/common";

/* 
Assume that if http body is in FormData type, and FormData is have a field name "xxx" (default = "data"), it can be extract by @BodyFormData decorator.
Example: 
@BodyFormData() createUserDto: CreateUserDto
*/
export const BodyFormData = createParamDecorator((data: string = "data", ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return JSON.parse(request.body[data]);
});
