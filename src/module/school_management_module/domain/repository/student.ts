import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/repository/base.pg";
import { Student } from "../model/student";
import { EntityManager, Loaded } from "@mikro-orm/postgresql";
import {
  CreateStudentDTO,
  SearchStudentDTO,
  UpdateStudentDTO,
} from "../dto/student.dto";
import { SchoolRepository } from "./school";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { ICreateOption } from "src/module/_core/domain/service/base.pg";
import { FilterQuery } from "mongoose";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";
import { getPopulateStudent } from "../../infras/type/queryStudent";

@Injectable()
export class StudentRepository extends BaseRepository<Student> {
  constructor(
    protected readonly em: EntityManager,
    private readonly schoolRepository: SchoolRepository
  ) {
    super(em, Student);
  }

  async checkDependency(school: CreateStudentDTO | UpdateStudentDTO) {
    const checkSchool = await this.schoolRepository.findOne({
      id: school.schoolId,
    });
    if (!checkSchool) throw new ClientExeption("Trường không tồn tại!");
  }

  async create(newStudente: CreateStudentDTO): Promise<Student> {
    await this.checkDependency(newStudente);
    return super.create(newStudente);
  }

  async update(
    filter: FilterQuery<Student>,
    updateSchoolData: UpdateStudentDTO
  ): Promise<boolean> {
    await this.checkDependency(updateSchoolData);

    return super.update(filter, updateSchoolData);
  }

  async find(
    searchStudent: SearchStudentDTO,
    queryOption?: QueryOption<Student>
  ): Promise<Student[]> {
    const { fullName, schoolId, page, pageSize, enrollmentStatus, level } =
      searchStudent;
    const conditionSearch: FilterQuery<Student> = {
      ...(fullName
        ? {
            $or: [
              { firstName: { $like: `%${fullName}%` } },
              { lastName: { $like: `%${fullName}%` } },
            ],
          }
        : {}),
      ...(schoolId ? { schoolId } : {}),
      ...(level ? { level } : {}),
      ...(enrollmentStatus ? { enrollmentStatus } : {}),
    };
    return this.em.find(Student, conditionSearch, {
      populate: ["school"],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }

  async findOne(
    filter: FilterQuery<Student>,
    queryOption?: QueryOption<Student>
  ): Promise<Student> {
    return this.em.findOne(Student, filter, {
      ...queryOption,
      populate: ["school"],
    });
  }
  async findAndCount(
    searchStudent: SearchStudentDTO,
    queryOption: QueryOption<Student> = {}
  ): Promise<[Loaded<Student, never, "*", never>[], number]> {
    const { fullName, schoolId, page, pageSize, enrollmentStatus, level } =
      searchStudent;
    const populate = getPopulateStudent(queryOption.populate || {});

    queryOption = { ...queryOption, page, pageSize, populate };
    const conditionSearch: FilterQuery<Student> = {
      ...(fullName
        ? {
            $or: [
              { firstName: { $like: `%${fullName}%` } },
              { lastName: { $like: `%${fullName}%` } },
            ],
          }
        : {}),
      ...(schoolId ? { schoolId } : {}),
      ...(level ? { level } : {}),
      ...(enrollmentStatus ? { enrollmentStatus } : {}),
    };

    return super.findAndCount(conditionSearch, queryOption);
  }
}
