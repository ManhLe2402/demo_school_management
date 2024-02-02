import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

import { config } from "src/module/_core/infras/env/default.env";

import { AppExceptionModule } from "src/module/_core/module/appExceptionFilter.module";
import { AllExceptionsFilter } from "src/module/_core/app/middleware/filter/allException";
import { HttpExceptionFilter } from "src/module/_core/app/middleware/filter/httpException";
import { PostgresExceptionFilter } from "src/module/_core/app/middleware/filter/postgresExeption";
import { CommonModule } from "src/module/school_management_module/common.module";

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: async () => {
        const { type, host, port, username, password, database } =
          config.postgresDb;
        return {
          driver: PostgreSqlDriver,
          // clientUrl: "postgres://postgres:ManhTH2402@localhost:5432/postgres",
          clientUrl: `postgres://${username}:${password}@${host}:${port}/${database}`,
          autoLoadEntities: true,
        };
      },
    }),
    CommonModule,
    AppExceptionModule.forRoot([
      AllExceptionsFilter,
      HttpExceptionFilter,
      PostgresExceptionFilter,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
