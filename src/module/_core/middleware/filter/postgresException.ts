import { DriverException } from "@mikro-orm/core";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch(DriverException)
export class PostgresExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdaterHost?: HttpAdapterHost) {}
  catch(exception: DriverException, host: ArgumentsHost) {
    console.log("PostgresExceptionFilter", exception);
  }
}
