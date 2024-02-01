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
  async find(
    searchSubject: SearchSubjectDTO,
    queryOption?: QueryOption<Subject>
  ): Promise<Subject[]> {
    const { page, pageSize, subjectName } = searchSubject;
    const conditionSearch: FilterQuery<Subject> = {
      ...(subjectName ? { subjectName } : {}),
    };
    return this.em.find(Subject, conditionSearch, {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async findAndCount(
    searchSubject: SearchSubjectDTO,
    queryOption?: QueryOption<Subject>
  ): Promise<[Loaded<Subject, never, "*", never>[], number]> {
    const { page, pageSize, subjectName } = searchSubject;
    const conditionSearch: FilterQuery<Subject> = {
      ...(subjectName ? { subjectName } : {}),
    };
    return super.findAndCount(conditionSearch, searchSubject);
  }
}
