import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { EntityCommon } from "src/common/common.entity";
import { PersonEntiy } from "src/common/person.entity";
import { SchoolEntity } from "src/school/school.entity";
import { Mixin } from "ts-mixer";

@Entity({ schema: "school_management" })
export class TeacherEntity extends PersonEntiy {
  @Property()
  yearStartTeaching!: number;

  @Property({ type: "text", default: "active" })
  teachingStatus!: string;

  @ManyToOne(() => SchoolEntity)
  schoolId!: string;
}
