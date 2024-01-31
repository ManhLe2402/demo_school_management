import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { MongoError } from "mongodb";
import { IErrorResponseData } from "../../config/type/dataResponse";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost?: HttpAdapterHost) {}

  catch(exception: MongoError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const dataResponse: IErrorResponseData = {
      status: false,
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      metaData: {
        dbCode: exception.code,
      },
      // timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest())
    };

    httpAdapter.reply(
      ctx.getResponse(),
      dataResponse,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
