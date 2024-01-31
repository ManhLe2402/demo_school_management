import { DriverException } from "@mikro-orm/core";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { IErrorResponseData } from "../../config/type/dataResponse";

@Catch(DriverException)
export class PostgresExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost?: HttpAdapterHost) {}

  catch(exception: DriverException, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let dataResponse: IErrorResponseData;

    if (exception.code == "23505") {
      const mapFields = {
        username: "Tài khoản",
        email: "Email",
        phone: "Số điện thoại",
        slug: "Đường dẫn",
      };
      const key = exception["detail"].split("Key (")[1].split(")=")[0];
      if (mapFields[key]) {
        dataResponse = {
          status: false,
          errorCode: 4000,
          message: `${mapFields[key]} đã tồn tại`,
        };
      }
    } else {
      dataResponse = {
        status: false,
        errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception["detail"] || exception.message,
        metaData: {
          dbCode: exception.code,
        },
        // timestamp: new Date().toISOString(),
        // path: httpAdapter.getRequestUrl(ctx.getRequest())
      };
    }

    (process.env.NODE_ENV == "local" || process.env.NODE_ENV == "test") &&
      console.log("LOG_DEV_POSTGRES_EXCEPTION", exception);

    httpAdapter.reply(
      ctx.getResponse(),
      dataResponse,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
