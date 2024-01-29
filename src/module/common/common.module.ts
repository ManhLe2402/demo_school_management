import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { School } from "./domain/model/school";
import { Teacher } from "./domain/model/teacher";
import { Student } from "./domain/model/student";
import { Subject } from "./domain/model/subject";
import { SubjectClass } from "./domain/model/subjectClass";
import { RegisterClass } from "./domain/model/registerClass";

@Module({
  imports: [
    MikroOrmModule.forFeature([
      School,
      Teacher,
      Student,
      Subject,
      SubjectClass,
      RegisterClass,
    ]),
  ],
  providers: [],
})
export class CommonModule {}
