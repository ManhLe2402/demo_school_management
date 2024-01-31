import { Injectable } from "@nestjs/common";
import { BaseService } from "src/module/_core/domain/service/base.pg";
import { Subject } from "../model/subject";
import { CreateSubjectDTO, UpdateSubjectDTO } from "../dto/subject.dto";
import { SubjectRepository } from "../repository/subject";

@Injectable()
export class SubjectService extends BaseService<
  Subject,
  CreateSubjectDTO,
  UpdateSubjectDTO
> {
  constructor(private readonly subjectRepository: SubjectRepository) {
    super(subjectRepository);
  }
}
