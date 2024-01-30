import { DynamicModule, ExceptionFilter, Module } from "@nestjs/common";
import { AllExceptionsFilter } from "../middleware/filter/allException";
import { APP_FILTER } from "@nestjs/core";

@Module({})
export class AppExceptionModule {
  static exceptionFilter: Array<new () => ExceptionFilter> = [
    AllExceptionsFilter,
  ];
  static forRoot(
    exceptionFilter: Array<new () => ExceptionFilter>
  ): DynamicModule {
    this.exceptionFilter = exceptionFilter;
    return {
      module: AppExceptionModule,
      providers: this.exceptionFilter.map((exceptionFilter) => ({
        provide: APP_FILTER,
        useClass: exceptionFilter,
      })),
    };
  }
  static forFeature(
    exceptionFilter: Array<new () => ExceptionFilter>
  ): DynamicModule {
    return {
      module: AppExceptionModule,
      providers: exceptionFilter.map((exceptionFilter) => ({
        provide: APP_FILTER,
        useClass: exceptionFilter,
      })),
    };
  }
}
