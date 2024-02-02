import { config } from "src/module/_core/infras/env/default.env";
import { v4 as uuid } from "uuid";
import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";

@Entity({ schema: "school_management" })
export class Subject {
  @PrimaryKey({ type: "uuid", nullable: false })
  @Unique()
  id: string = uuid();

  @Property({ type: "text" })
  subjectName!: string;

  @Property()
  level!: number;

  @Property()
  creditHour!: number;

  @Property({ type: "text", default: "active" })
  subjectStatus: string;

  @Property({ hidden: true })
  createAt = new Date();

  @Property({ onUpdate: () => new Date(), hidden: true })
  updateAt = new Date();

  @Property({ type: "timestamptz", hidden: true })
  deleteAt = null;
}
