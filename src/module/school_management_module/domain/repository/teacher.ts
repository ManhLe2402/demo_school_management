import { Injectable } from "@nestjs/common";

import { Teacher } from "../model/teacher";
import {
  EntityManager,
  FilterQuery,
  Loaded,
  RequiredEntityData,
} from "@mikro-orm/postgresql";
import { BaseRepository } from "src/module/_core/domain/repository/base.pg";
import { SearchTeacherDTO, UpdateTeacherDTO } from "../dto/teacher.dto";
import { ICreateOption } from "src/module/_core/domain/service/base.pg";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { SchoolRepository } from "./school";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";
import { getPopulateTeacher } from "../../infras/type/queryTeacher";

@Injectable()
export class TeacherRepository extends BaseRepository<Teacher> {
  constructor(
    protected readonly em: EntityManager,
    private readonly schoolRepository: SchoolRepository
  ) {
    super(em, Teacher);
  }
  async checkDependency(dataDependency: RequiredEntityData<Teacher>) {
    const checkSchool = await this.schoolRepository.findOne({
      id: dataDependency.schoolId,
    });
    if (!checkSchool) throw new ClientExeption("Trường không tồn tại!");
  }
  async create(newTeacherData: RequiredEntityData<Teacher>): Promise<Teacher> {
    await this.checkDependency(newTeacherData);
    return super.create(newTeacherData);
  }

  async update(
    filterQuery: FilterQuery<Teacher>,
    updateTeacherData: UpdateTeacherDTO
  ): Promise<boolean> {
    await this.checkDependency(updateTeacherData);
    return super.update(filterQuery, updateTeacherData);
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
