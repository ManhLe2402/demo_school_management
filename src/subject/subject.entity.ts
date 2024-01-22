import { Entity, Property } from "@mikro-orm/core";
import { EntityCommon } from "src/common/common.entity";

@Entity({ schema: "school_management" })
export class SubjectEntity extends EntityCommon {
  @Property({ type: "text" })
  subjectName!: string;

  @Property()
  level!: number;

  @Property()
  creditHour!: number;

  @Property({ type: "text", default: "active" })
  subjectStatus: string;
}
