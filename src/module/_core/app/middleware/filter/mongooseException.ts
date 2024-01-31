import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Error } from "mongoose";
import { IErrorResponseData } from "../../config/type/dataResponse";

@Catch(Error.ValidationError)
export class MongooseExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost?: HttpAdapterHost) {}

  catch(exception: Error.ValidationError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const dataResponse: IErrorResponseData = {
      status: false,
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      metaData: Object.values(exception.errors).map((error) => {
        delete error["properties"];
        return error;
      }),
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
