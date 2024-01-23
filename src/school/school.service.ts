import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { SchoolEntity } from "./school.entity";
import { v4 as uuidv4 } from "uuid";
import { CreateSchoolDTO, GetDataSchoolDTO } from "./school.dto";
@Injectable()
export class SchoolService {
  constructor(private readonly em: EntityManager) {}
  async create(school: CreateSchoolDTO): Promise<CreateSchoolDTO> {
    const id = uuidv4();
    const newSchool = this.em.create(SchoolEntity, { id, ...school });
    await this.em.persistAndFlush(newSchool);
    return newSchool;
  }
  async findOne(id: uuidv4): Promise<CreateSchoolDTO> {
    return this.em.findOne(SchoolEntity, id);
  }
}
