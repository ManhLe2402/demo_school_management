import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { config } from "src/module/_core/infras/env/default.env";
const { schema } = config.postgresDb;
@Entity({ schema })
export class School {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id!: string;

  @Property({ type: "text" })
  schoolName: string;

  @Property({ type: "text" })
  address: string;

  @Property({ type: "text" })
  email: string;

  @Property({ type: "text" })
  hotline: string;

  @Property()
  dateEstablished: number;

  @Property()
  typeOfEducation: number;

  @Property()
  createAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();

  @Property({ type: "timestamptz" })
  deleteAt = null;

  @Property({ type: "text" })
  description: string = "";
}
