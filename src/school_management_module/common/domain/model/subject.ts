import { config } from "src/module/_core/infras/env/default.env";

import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";

@Entity({ schema: "school_management" })
export class Subject {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id!: string;

  @Property({ type: "text" })
  subjectName!: string;

  @Property()
  level!: number;

  @Property()
  creditHour!: number;

  @Property({ type: "text", default: "active" })
  subjectStatus: string;

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  @Property({ type: "timestamptz" })
  deleteAt = null;
}
