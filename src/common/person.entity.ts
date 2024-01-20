import { Property } from "@mikro-orm/core";

export class PersonEntiy{
  @Property({type:"text"})
  firstName:string

  @Property({type:"text"})
  lastName!:string
  
  @Property()
  address!:string

  @Property()
  gender!:string

  @Property({type:"timestamptz"})
  dateOfBirth!: Date

  @Property()
  phone!:string

  @Property()
  email:string=null
}