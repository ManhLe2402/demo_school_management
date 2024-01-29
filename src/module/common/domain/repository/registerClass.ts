import { Injectable } from "@nestjs/common";
import { RegisterClass } from "../model/registerClass";
import { BaseRepository } from "src/module/_core/domain/respository/baseRepository.pg";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class RegisterClassRepository extends BaseRepository<RegisterClass> {
  constructor(protected readonly em: EntityManager) {
    super(em, RegisterClass);
  }
}
