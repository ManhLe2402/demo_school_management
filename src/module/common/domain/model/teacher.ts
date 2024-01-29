import { Cascade, Entity, ManyToOne, Property, Ref } from "@mikro-orm/core";
import { Person } from "./person";
import { School } from "./school";
import { config } from "src/module/_core/infras/env/default.env";
const { schema } = config.postgresDb;
@Entity({ schema })
export class Teacher extends Person {
  @Property()
  yearStartTeaching!: number;

  @Property({ type: "text", default: "active" })
  teachingStatus!: string;

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  @Property({ type: "timestamptz" })
  deleteAt = null;

  @ManyToOne(() => School, { cascade: [Cascade.REMOVE], ref: true })
  school: Ref<School>;

  @Property({ type: "uuid" })
  schoolId!: string;
}
