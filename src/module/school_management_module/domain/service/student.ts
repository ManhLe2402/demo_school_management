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
  async checkDependency(school: CreateStudentDTO | UpdateStudentDTO) {
    const checkSchool = await this.schoolRepository.findOne({
      id: school.schoolId,
    });
    if (!checkSchool) throw new ClientExeption("Trường không tồn tại!");
  }
  async create(
    newStudente: CreateStudentDTO,
    options?: ICreateOption<Student>
  ): Promise<Student> {
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
    queryOption = { ...queryOption, page, pageSize, populate: ["school"] };
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
