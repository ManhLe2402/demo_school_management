import { Cascade, Entity, ManyToOne, Property, Ref } from "@mikro-orm/core";
import { config } from "src/module/_core/infras/env/default.env";
import { SubjectClass } from "./subjectClass";
import { Student } from "./student";
const { schema } = config.postgresDb;
@Entity({ schema })
export class RegisterClass {
  @ManyToOne(() => SubjectClass, {
    cascade: [Cascade.REMOVE],
    ref: true,
  })
  subjectClass: Ref<SubjectClass>;

  @Property({ type: "uuid" })
  subjectClassId: string;

  @ManyToOne(() => Student, { cascade: [Cascade.REMOVE], ref: true })
  student: Ref<Student>;

  @Property({ type: "uuid" })
  studentId: string;

  @Property({ default: null })
  status: string;
}
