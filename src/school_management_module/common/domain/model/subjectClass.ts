import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
  Unique,
} from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
import { Teacher } from "./teacher";
import { Subject } from "./subject";

@Entity({ schema: "school_management" })
export class SubjectClass {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id: string = uuid();

  @Property()
  maxQuantity!: number;

  @Property({ default: 20 })
  minQuantity!: number;

  @Property({ type: "date" })
  startAt!: Date;

  @Property({ type: "date" })
  endAt!: Date;

  @Property({ type: "string" })
  classRoom!: string;

  @Property()
  academicYear!: number;

  @Property({ hidden: true })
  createAt = new Date();

  @Property({ onUpdate: () => new Date(), hidden: true })
  updateAt = new Date();

  @Property({ type: "timestamptz", hidden: true })
  deleteAt = null;

  @Property({ default: "active" })
  classStatus!: string;

  @ManyToOne(() => Teacher, {
    cascade: [Cascade.REMOVE],
    ref: true,
    persist: false,
  })
  teacher: Ref<Teacher>;

  @Property({ type: "uuid", hidden: true })
  teacherId!: string;

  @ManyToOne(() => Subject, {
    cascade: [Cascade.REMOVE],
    ref: true,
    persist: false,
  })
  subject: Ref<Subject>;

  @Property({ type: "uuid", hidden: true })
  subjectId!: string;
}
