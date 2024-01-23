import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { CreateSubjectDTO } from "./subject.dto";
import { SubjectEntity } from "./subject.entity";
import { v4 as uuid } from "uuid";
@Injectable()
export class SubjectService {
  constructor(private readonly em: EntityManager) {}
  async create(subject: CreateSubjectDTO): Promise<CreateSubjectDTO> {
    const id = uuid();
    const newSubject = this.em.create(SubjectEntity, { id, ...subject });
    await this.em.persistAndFlush(newSubject);
    return newSubject;
  }

  async findAll(page = 1, pageSize = 20) {
    try {
      const data = await this.em.findAndCount(
        SubjectEntity,
        {},
        { limit: pageSize, offset: (page - 1) * pageSize }
      );
      return data;
    } catch (error) {
      console.log("findAllSubjectService", error);
    }
  }
}
