import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { IErrorResponseData } from "../../config/type/dataResponse";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost?: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const dataResponse: IErrorResponseData = {
      status: false,
      errorCode: exception?.errorCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception?.message || exception.toString(),
      // timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest())
    };

    (process.env.NODE_ENV == "local" || process.env.NODE_ENV == "test") &&
      console.log("LOG_DEV_EXCEPTION", exception);

    httpAdapter.reply(
      ctx.getResponse(),
      dataResponse,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
