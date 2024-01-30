import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { config } from "src/module/_core/infras/env/default.env";
import { v4 as uuid } from "uuid";
const { schema } = config.postgresDb;
@Entity({ schema })
export class School {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id: string = uuid();

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

  @Property({ hidden: true })
  createAt = new Date();

  @Property({ onUpdate: () => new Date(), hidden: true })
  updateAt = new Date();

  @Property({ type: "timestamptz", hidden: true })
  deleteAt = null;

  @Property({ type: "text" })
  description: string = "";
}
