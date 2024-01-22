import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { CreateTeacherDTO } from "./teacher.dto";
import { v4 as uuidv4 } from "uuid";
import { TeacherEntity } from "./teacher.entity";

@Injectable()
export class TeacherService {
  constructor(private readonly em: EntityManager) {}
  async create(teacher: CreateTeacherDTO): Promise<CreateTeacherDTO> {
    const id = uuidv4();
    const newTeacher = this.em.create(TeacherEntity, { id, ...teacher });
    await this.em.persistAndFlush(newTeacher);
    return teacher;
  }
}
