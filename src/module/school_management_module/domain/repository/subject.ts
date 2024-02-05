import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/repository/base.pg";
import { Subject } from "../model/subject";
import { EntityManager, FilterQuery, Loaded } from "@mikro-orm/postgresql";
import { SearchSubjectDTO } from "../dto/subject.dto";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";

@Injectable()
export class SubjectRepository extends BaseRepository<Subject> {
  constructor(protected readonly em: EntityManager) {
    super(em, Subject);
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
