import { Injectable } from "@nestjs/common";
import { BaseService } from "src/module/_core/domain/service/base.pg";
import { Student } from "../model/student";
import { CreateStudentDTO, UpdateStudentDTO } from "../dto/student.dto";
import { StudentRepository } from "../repository/student";

@Injectable()
export class StudentService extends BaseService<
  Student,
  CreateStudentDTO,
  UpdateStudentDTO
> {
  constructor(private readonly studentRepository: StudentRepository) {
    super(studentRepository);
  }
}
