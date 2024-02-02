import { Injectable } from "@nestjs/common";

import { TeacherRepository } from "../repository/teacher";
import {
  CreateTeacherDTO,
  SearchTeacherDTO,
  UpdateTeacherDTO,
} from "../dto/teacher.dto";
import { Teacher } from "../model/teacher";
import {
  BaseService,
  ICreateOption,
} from "src/module/_core/domain/service/base.pg";
import { SchoolRepository } from "../repository/school";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { FilterQuery, Loaded } from "@mikro-orm/core";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class TeacherService extends BaseService<
  Teacher,
  CreateTeacherDTO,
  UpdateTeacherDTO
> {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly em: EntityManager
  ) {
    super(teacherRepository);
  }
  async create(
    createDataDTO: CreateTeacherDTO,
    options?: ICreateOption<Teacher>
  ): Promise<Teacher> {
    const checkSchool = await this.schoolRepository.findOne({
      id: createDataDTO.schoolId,
    });
    if (!checkSchool) throw new ClientExeption("Trường không tồn tại!");

    return super.create(createDataDTO);
  }

  async update(
    filter: FilterQuery<Teacher>,
    updateDataDTO: UpdateTeacherDTO
  ): Promise<boolean> {
    const checkSchool = await this.schoolRepository.findOne({
      id: updateDataDTO.schoolId,
    });
    if (!checkSchool) throw new ClientExeption("Trường không tồn tại!");

    return super.update(filter, updateDataDTO);
  }
  async findOne(
    filter: FilterQuery<Teacher>,
    queryOption?: QueryOption<Teacher>
  ): Promise<Teacher> {
    return this.em.findOne(Teacher, filter, {
      ...queryOption,
      populate: ["school"],
    });
  }
  async findAndCount(
    searchTeacherDTO: SearchTeacherDTO,
    queryOption: QueryOption<Teacher> = {}
  ): Promise<[Loaded<Teacher, never, "*", never>[], number]> {
    const { fullName, schoolId, page, pageSize } = searchTeacherDTO;
    queryOption = { ...queryOption, page, pageSize, populate: ["school"] };
    const conditionSearch: FilterQuery<Teacher> = {
      ...(fullName
        ? {
            $or: [
              { firstName: { $like: `%${fullName}%` } },
              { lastName: { $like: `%${fullName}%` } },
            ],
          }
        : {}),
      ...(schoolId ? { schoolId } : {}),
    };

    return super.findAndCount(conditionSearch, queryOption);
  }
  async find(
    searchTeacherDTO: SearchTeacherDTO,
    queryOption?: QueryOption<Teacher>
  ): Promise<Teacher[]> {
    const { fullName, schoolId, page, pageSize } = searchTeacherDTO;
    const conditionSearch: FilterQuery<Teacher> = {
      ...(fullName
        ? {
            $or: [
              { firstName: { $like: `%${fullName}%` } },
              { lastName: { $like: `%${fullName}%` } },
            ],
          }
        : {}),
      ...(schoolId ? { schoolId } : {}),
    };

    return this.em.find(Teacher, conditionSearch, {
      populate: ["school"],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
  }
}
