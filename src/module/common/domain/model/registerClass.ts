import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
  Unique,
} from "@mikro-orm/core";
import { config } from "src/module/_core/infras/env/default.env";
import { SubjectClass } from "./subjectClass";
import { Student } from "./student";
import { v4 as uuidv4 } from "uuid";

const { schema } = config.postgresDb;
@Entity({ schema })
export class RegisterClass {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id: string = uuidv4();

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  @Property({ type: "timestamptz" })
  deleteAt = null;

  @ManyToOne(() => SubjectClass, {
    cascade: [Cascade.REMOVE],
    ref: true,
  })
  subjectClass: Ref<SubjectClass>;

  @Property({ type: "uuid", persist: false })
  subjectClassId: string;

  @ManyToOne(() => Student, { cascade: [Cascade.REMOVE], ref: true })
  student: Ref<Student>;

  @Property({ type: "uuid", persist: false })
  studentId: string;

  @Property({ default: null })
  status: string;
}
