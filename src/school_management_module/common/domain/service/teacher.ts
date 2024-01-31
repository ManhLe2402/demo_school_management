import { Injectable } from "@nestjs/common";

import { TeacherRepository } from "../repository/teacher";
import { CreateTeacherDTO, UpdateTeacherDTO } from "../dto/teacher.dto";
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
  // async findOne(
  //   filter: FilterQuery<Teacher>,
  //   queryOption?: QueryOption<Teacher>
  // ): Promise<Loaded<Teacher, never, "*", never>> {
  //   console.log(filter);
  //   const data = await this.em.findOne(filter, );
  //   console.log("check DATA", data);
  //   return data as any;
  // }
}
