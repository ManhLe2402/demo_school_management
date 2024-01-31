import { DynamicModule, ExceptionFilter, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "../app/middleware/filter/allException";

@Module({})
export class AppExceptionModule {
  static exceptionFilters: Array<new () => ExceptionFilter> = [
    AllExceptionsFilter,
  ];

  static forRoot(
    exceptionFilters: Array<new () => ExceptionFilter>
  ): DynamicModule {
    this.exceptionFilters = exceptionFilters;
    return {
      module: AppExceptionModule,
      providers: this.exceptionFilters.map((exceptionFilter) => ({
        provide: APP_FILTER,
        useClass: exceptionFilter,
      })),
    };
  }

  static forFeature(
    exceptionFilters: Array<new () => ExceptionFilter>
  ): DynamicModule {
    return {
      module: AppExceptionModule,
      providers: exceptionFilters.map((exceptionFilter) => ({
        provide: APP_FILTER,
        useClass: exceptionFilter,
      })),
    };
  }
}
