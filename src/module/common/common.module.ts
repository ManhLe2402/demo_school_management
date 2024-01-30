import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { School } from "./domain/model/school";
import { Teacher } from "./domain/model/teacher";
import { Student } from "./domain/model/student";
import { Subject } from "./domain/model/subject";
import { SubjectClass } from "./domain/model/subjectClass";
import { RegisterClass } from "./domain/model/registerClass";
import { SchoolService } from "./domain/service/school";
import { TeacherService } from "./domain/service/teacher";
import { StudentService } from "./domain/service/student";
import { SubjectService } from "./domain/service/subject";
import { SubjectClassService } from "./domain/service/subjectClass";
import { RegisterClassService } from "./domain/service/registerClass";
import { SchoolController } from "./app/controller/school";
import { TeacherController } from "./app/controller/teacher";
import { StudentController } from "./app/controller/student";
import { SubjectController } from "./app/controller/subject";
import { SubjectClassController } from "./app/controller/subjectClass";
import { RegisterClassController } from "./app/controller/registerClass";
import { SchoolRepository } from "./domain/repository/school";
import { TeacherRepository } from "./domain/repository/teacher";
import { StudentRepository } from "./domain/repository/student";
import { SubjectRepository } from "./domain/repository/subject";
import { SubjectClassRepository } from "./domain/repository/subjectClass";
import { RegisterClassRepository } from "./domain/repository/registerClass";

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
  providers: [
    SchoolRepository,
    SchoolService,
    TeacherService,
    TeacherRepository,
    StudentService,
    StudentRepository,
    SubjectService,
    SubjectRepository,
    SubjectClassService,
    SubjectClassRepository,
    RegisterClassService,
    RegisterClassRepository,
  ],
  controllers: [
    SchoolController,
    TeacherController,
    StudentController,
    SubjectController,
    SubjectClassController,
    RegisterClassController,
  ],
})
export class CommonModule {}
