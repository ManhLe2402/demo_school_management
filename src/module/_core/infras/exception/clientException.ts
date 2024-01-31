import { HttpException } from "@nestjs/common";

export class ClientExeption extends HttpException {
    constructor(message: string, errorCode = 4000, context?: Object) {
        super(
            {
                message,
                errorCode,
                ...context
            },
            400
        );
    }
}
