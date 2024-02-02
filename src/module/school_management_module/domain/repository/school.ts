import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/repository/base.pg";
import { School } from "../model/school";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class SchoolRepository extends BaseRepository<School> {
  constructor(protected readonly em: EntityManager) {
    super(em, School);
  }
}
