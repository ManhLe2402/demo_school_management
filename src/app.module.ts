import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { MikroOrmModule } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { SchoolModule } from "./school/school.module";
import { TeacherModule } from "./teacher/teacher.module";
import { SubjectModule } from "./subject/subject.module";

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          driver: PostgreSqlDriver,
          clientUrl: "postgres://postgres:ManhTH2402@localhost:5432/postgres",
          autoLoadEntities: true,
        };
      },
    }),
    SchoolModule,
    TeacherModule,
    SubjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
