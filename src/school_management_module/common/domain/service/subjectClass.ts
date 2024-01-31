import { Injectable } from "@nestjs/common";

import { SubjectClass } from "../model/subjectClass";
import {
  CreateSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "../dto/subjecClass.dto";
import { SubjectClassRepository } from "../repository/subjectClass";
import { BaseService } from "src/module/_core/domain/service/base.pg";

@Injectable()
export class SubjectClassService extends BaseService<
  SubjectClass,
  CreateSubjectClassDTO,
  UpdateSubjectClassDTO
> {
  constructor(private readonly subjecClassRepository: SubjectClassRepository) {
    super(subjecClassRepository);
  }
}
