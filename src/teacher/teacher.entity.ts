import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { PersonEntiy } from "src/common/person/person.entity";
import { SchoolEntity } from "src/school/school.entity";
import { SubjectClassEntity } from "src/subjectClass/subjectClass.entity";

@Entity({ schema: "school_management" })
export class TeacherEntity extends PersonEntiy {
  @Property()
  yearStartTeaching!: number;

  @Property({ type: "text", default: "active" })
  teachingStatus!: string;

  @ManyToOne(() => SchoolEntity)
  schoolId!: string;

  @OneToMany(() => SubjectClassEntity, (subject) => subject.teacherId, {
    cascade: [Cascade.REMOVE, Cascade.ALL],
  })
  subjectClass = new Collection<SubjectClassEntity>(this);
}
