import { Cascade, Entity, ManyToOne, Property, Ref } from "@mikro-orm/core";
import { Person } from "./person";
import { School } from "./school";

@Entity({ schema: "school_management" })
export class Teacher extends Person {
  @Property()
  yearStartTeaching!: number;

  @Property({ type: "text", default: "active" })
  teachingStatus!: string;

  @ManyToOne(() => School, {
    cascade: [Cascade.REMOVE],
    ref: true,
    persist: false,
  })
  school: Ref<School>;

  @Property({ hidden: true, type: "uuid" })
  schoolId!: string;
}
