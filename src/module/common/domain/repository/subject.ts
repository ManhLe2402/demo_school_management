import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/respository/baseRepository.pg";
import { Subject } from "../model/subject";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class SubjectRepository extends BaseRepository<Subject> {
  constructor(protected readonly em: EntityManager) {
    super(em, Subject);
  }
}
