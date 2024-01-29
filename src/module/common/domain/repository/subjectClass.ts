import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/respository/baseRepository.pg";
import { SubjectClass } from "../model/subjectClass";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class SubjectClassRepository extends BaseRepository<SubjectClass> {
  constructor(protected readonly em: EntityManager) {
    super(em, SubjectClass);
  }
}
