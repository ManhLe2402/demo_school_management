import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
  Unique,
} from "@mikro-orm/core";

import { Person } from "./person";
import { School } from "./school";

@Entity({ schema: "school_management" })
export class Student extends Person {
  @Property()
  level!: number;

  @Property({ default: "active" })
  enrollmentStatus!: string;

  @ManyToOne(() => School, {
    cascade: [Cascade.REMOVE],
    ref: true,
    persist: false,
  })
  school: Ref<School>;

  @Property({ type: "uuid", hidden: true })
  schoolId!: string;
}
