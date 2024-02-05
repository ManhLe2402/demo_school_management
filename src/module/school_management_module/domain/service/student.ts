import { Injectable } from "@nestjs/common";
import {
  BaseService,
  ICreateOption,
} from "src/module/_core/domain/service/base.pg";
import { Student } from "../model/student";
import {
  CreateStudentDTO,
  SearchStudentDTO,
  UpdateStudentDTO,
} from "../dto/student.dto";
import { StudentRepository } from "../repository/student";
import { SchoolRepository } from "../repository/school";
import { EntityManager, FilterQuery, Loaded } from "@mikro-orm/postgresql";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";

@Injectable()
export class StudentService extends BaseService<
  Student,
  CreateStudentDTO,
  UpdateStudentDTO
> {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly em: EntityManager
  ) {
    super(studentRepository);
  }
}
