import { Injectable } from "@nestjs/common";

import { SubjectClass } from "../model/subjectClass";
import {
  CreateSubjectClassDTO,
  SearchSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "../dto/subjecClass.dto";
import { SubjectClassRepository } from "../repository/subjectClass";
import {
  BaseService,
  ICreateOption,
} from "src/module/_core/domain/service/base.pg";
import { TeacherRepository } from "../repository/teacher";
import { SubjectRepository } from "../repository/subject";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { FilterQuery, Loaded } from "@mikro-orm/core";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class SubjectClassService extends BaseService<
  SubjectClass,
  CreateSubjectClassDTO,
  UpdateSubjectClassDTO
> {
  constructor(
    private readonly subjectClassRepository: SubjectClassRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly em: EntityManager
  ) {
    super(subjectClassRepository);
  }
}
