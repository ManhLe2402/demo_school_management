import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/respository/baseRepository.pg";
import { Teacher } from "../model/teacher";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class TeacherRepository extends BaseRepository<Teacher> {
  constructor(protected readonly em: EntityManager) {
    super(em, Teacher);
  }
}
