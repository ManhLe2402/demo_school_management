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

@Entity({ schema: "school_managegment" })
export class TeacherEntity extends Mixin(EntityCommon, PersonEntiy) {
  @PrimaryKey({ type: "uuid" })
  id: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ type: "timestamptz" })
  dateOfBirth: Date;

  @ManyToOne(() => SchoolEntity, { onUpdate: "cascade", onDelete: "cascade" })
  schoolId!: SchoolEntity;
}
