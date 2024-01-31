import { Injectable } from "@nestjs/common";

import { Teacher } from "../model/teacher";
import { EntityManager } from "@mikro-orm/postgresql";
import { BaseRepository } from "src/module/_core/domain/repository/base.pg";

@Injectable()
export class TeacherRepository extends BaseRepository<Teacher> {
  constructor(protected readonly em: EntityManager) {
    super(em, Teacher);
  }
}
