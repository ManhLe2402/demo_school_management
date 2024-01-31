import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request } from "express";
import { IErrorResponseData } from "../../config/type/dataResponse";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost?: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let error;
    if (typeof exceptionResponse === "string")
      error = { message: exceptionResponse };
    else if (exceptionResponse["message"])
      error = {
        message: exceptionResponse["message"],
        metaData: {
          exception: exceptionResponse,
          stack: exception.stack,
        },
      };
    else
      error = {
        message: "Lỗi không xác định !",
        metaData: {
          exception: exceptionResponse,
          stack: exception.stack,
        },
      };

    const dataResponse: IErrorResponseData = {
      status: false,
      errorCode: exceptionResponse["errorCode"] || statusCode,
      ...error,

      // timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest())
    };

    httpAdapter.reply(ctx.getResponse(), dataResponse, statusCode);
  }
}
