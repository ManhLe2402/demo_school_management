import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/repository/base.pg";
import { Student } from "../model/student";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class StudentRepository extends BaseRepository<Student> {
  constructor(protected readonly em: EntityManager) {
    super(em, Student);
  }
}
