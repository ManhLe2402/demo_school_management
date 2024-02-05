import { Injectable } from "@nestjs/common";
import { BaseService } from "src/module/_core/domain/service/base.pg";
import { Subject } from "../model/subject";
import {
  CreateSubjectDTO,
  SearchSubjectDTO,
  UpdateSubjectDTO,
} from "../dto/subject.dto";
import { SubjectRepository } from "../repository/subject";
import { FilterQuery, Loaded } from "@mikro-orm/core";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class SubjectService extends BaseService<
  Subject,
  CreateSubjectDTO,
  UpdateSubjectDTO
> {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly em: EntityManager
  ) {
    super(subjectRepository);
  }
}
