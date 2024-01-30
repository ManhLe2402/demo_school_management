import { Injectable } from "@nestjs/common";
import { BaseService } from "src/module/_core/domain/service/baseService.pg";
import { SubjectClass } from "../model/subjectClass";
import {
  CreateSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "../dto/subjecClass.dto";
import { SubjectClassRepository } from "../repository/subjectClass";

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
