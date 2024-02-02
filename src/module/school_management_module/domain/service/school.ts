import { Injectable } from "@nestjs/common";
import { BaseService } from "src/module/_core/domain/service/base.pg";
import { School } from "../model/school";
import { CreateSchoolDTO, UpdateSchoolDTO } from "../dto/school.dto";
import { SchoolRepository } from "../repository/school";

@Injectable()
export class SchoolService extends BaseService<
  School,
  CreateSchoolDTO,
  UpdateSchoolDTO
> {
  constructor(private readonly schoolRepository: SchoolRepository) {
    super(schoolRepository);
  }
}
