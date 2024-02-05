import { Injectable } from "@nestjs/common";

import { TeacherRepository } from "../repository/teacher";
import { CreateTeacherDTO, UpdateTeacherDTO } from "../dto/teacher.dto";
import { Teacher } from "../model/teacher";
import { BaseService } from "src/module/_core/domain/service/base.pg";

@Injectable()
export class TeacherService extends BaseService<
  Teacher,
  CreateTeacherDTO,
  UpdateTeacherDTO
> {
  constructor(private readonly teacherRepository: TeacherRepository) {
    super(teacherRepository);
  }
}
