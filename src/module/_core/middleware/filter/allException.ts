import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { IErrorResponseData } from "../../config/type/dataResponse";

//Những lỗi không được trycatch thì sẽ vào đây
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost?: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const dataResponse: IErrorResponseData = {
      status: false,
      errorCode: exception?.errorCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception?.message || exception.tostring(),
    };

    httpAdapter.reply(
      ctx.getResponse(),
      dataResponse,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
