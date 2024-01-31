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
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id!: string;

  @Property()
  level!: number;

  @Property({ default: "active" })
  enrollmentStatus!: string;

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  @Property({ type: "timestamptz" })
  deleteAt = null;

  @ManyToOne(() => School, { cascade: [Cascade.REMOVE], ref: true })
  school: Ref<School>;

  @Property({ type: "uuid", persist: false })
  schoolId!: string;
}
