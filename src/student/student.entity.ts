import { Entity } from "@mikro-orm/core";
import { PersonEntiy } from "src/common/person.entity";

@Entity()
export class StudentEntity extends PersonEntiy{
  
}