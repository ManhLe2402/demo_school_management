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
import { Teacher } from "./teacher";
import { Subject } from "./subject";

const { schema } = config.postgresDb;
@Entity({ schema })
export class SubjectClass {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id!: string;

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

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  @Property({ type: "timestamptz" })
  deleteAt = null;

  @Property({ default: "active" })
  classStatus!: string;

  @ManyToOne(() => Teacher, { cascade: [Cascade.REMOVE], ref: true })
  teacher: Ref<Teacher>;

  @Property({ type: "uuid" ,persist:false})
  teacherId!: string;

  @ManyToOne(() => Subject, { cascade: [Cascade.REMOVE], ref: true })
  subject: Ref<Subject>;

  @Property({ type: "uuid",persist:false })
  subjectId!: string;
}
