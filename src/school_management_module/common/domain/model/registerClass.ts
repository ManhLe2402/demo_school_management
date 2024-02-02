import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
  Unique,
} from "@mikro-orm/core";

import { SubjectClass } from "./subjectClass";
import { Student } from "./student";
import { v4 as uuidv4 } from "uuid";

@Entity({ schema: "school_management" })
export class RegisterClass {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id: string = uuidv4();

  @Property({ hidden: true })
  createAt = new Date();

  @Property({ onUpdate: () => new Date(), hidden: true })
  updateAt = new Date();

  @Property({ type: "timestamptz", hidden: true })
  deleteAt = null;

  @ManyToOne(() => SubjectClass, {
    cascade: [Cascade.REMOVE],
    ref: true,
    persist: false,
  })
  subjectClass: Ref<SubjectClass>;

  @Property({ type: "uuid", hidden: true })
  subjectClassId: string;

  @ManyToOne(() => Student, {
    cascade: [Cascade.REMOVE],
    ref: true,
    persist: false,
  })
  student: Ref<Student>;

  @Property({ type: "uuid", hidden: true })
  studentId: string;

  @Property({ default: null })
  status: string;
}
