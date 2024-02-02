import { PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { v4 as uuid } from "uuid";
export class Person {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id: string = uuid();

  @Property({ type: "text" })
  firstName: string;

  @Property({ type: "text" })
  lastName!: string;

  @Property({ type: "text" })
  address!: string;

  @Property({ type: "text" })
  gender!: string;

  @Property({ type: "timestamp" })
  dateOfBirth!: Date;

  @Property({ type: "text" })
  phone!: string;

  @Property({ type: "text" })
  email: string = null;

  @Property({ hidden: true })
  createAt = new Date();

  @Property({ onUpdate: () => new Date(), hidden: true })
  updateAt = new Date();

  @Property({ type: "timestamptz", hidden: true })
  deleteAt = null;
}
