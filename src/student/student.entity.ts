import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { PersonEntiy } from "src/common/person.entity";
import { SchoolEntity } from "src/school/school.entity";

@Entity({ schema: "school_management" })
export class StudentEntity extends PersonEntiy {
  @Property()
  level!: number;

  @Property({ default: "active" })
  enrollmentStatus!: string;

  @ManyToOne(() => SchoolEntity)
  schoolId!: string;
}
