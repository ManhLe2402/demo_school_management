import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { IErrorResponseData } from "../../config/type/dataResponse";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost?: HttpAdapterHost) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let error;
    if (typeof exceptionResponse === "string")
      error = { message: exceptionResponse };
    else if (exceptionResponse["message"])
      error = {
        message: exceptionResponse["message"],
        metaData: { exception: exceptionResponse, stack: exception.stack },
      };
    else
      error = {
        message: "Unknow Error!",
        metaData: { exception: exceptionResponse, stack: exception.stack },
      };

    const dataResponse: IErrorResponseData = {
      status: false,
      errorCode: exceptionResponse["errorCode"] || statusCode,
      ...error,
    };

    httpAdapter.reply(ctx.getResponse, dataResponse, statusCode);
  }
}
