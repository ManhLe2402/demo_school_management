import { PrimaryKey, Property, Unique } from "@mikro-orm/core";

export class Person {
  @PrimaryKey({ type: "uuid" })
  @Unique()
  id!: string;

  @Property()
  createAt = new Date();
  @Property({ onUpdate: () => new Date() })
  updateAt = new Date();
  @Property({ type: "timestamptz" })
  deleteAt = null;

  @Property({ type: "text" })
  firstName: string;

  @Property({ type: "text" })
  lastName!: string;

  @Property()
  address!: string;

  @Property()
  gender!: string;

  @Property({ type: "timestamp" })
  dateOfBirth!: Date;

  @Property()
  phone!: string;

  @Property()
  email: string = null;
}
