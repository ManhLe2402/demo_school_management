import { Injectable } from "@nestjs/common";

import { SubjectClass } from "../model/subjectClass";
import {
  CreateSubjectClassDTO,
  SearchSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "../dto/subjecClass.dto";
import { SubjectClassRepository } from "../repository/subjectClass";
import {
  BaseService,
  ICreateOption,
} from "src/module/_core/domain/service/base.pg";
import { TeacherRepository } from "../repository/teacher";
import { SubjectRepository } from "../repository/subject";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { FilterQuery, Loaded } from "@mikro-orm/core";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class SubjectClassService extends BaseService<
  SubjectClass,
  CreateSubjectClassDTO,
  UpdateSubjectClassDTO
> {
  constructor(
    private readonly subjecClassRepository: SubjectClassRepository,
    private readonly teacherRepository: TeacherRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly em: EntityManager
  ) {
    super(subjecClassRepository);
  }
  async checkDependency(data: CreateSubjectClassDTO | UpdateSubjectClassDTO) {
    const { teacherId, subjectId } = data;
    const checkTeacher = await this.teacherRepository.findOne({
      id: teacherId,
    });
    if (!checkTeacher) throw new ClientExeption("Giáo viên không tồn tại!");

    const checkSubject = await this.subjectRepository.findOne({
      id: subjectId,
    });
    if (!checkSubject) throw new ClientExeption("Môn học không tồn tại!");
  }
  async create(
    newData: CreateSubjectClassDTO,
    options?: ICreateOption<SubjectClass>
  ): Promise<SubjectClass> {
    await this.checkDependency(newData);
    return super.create(newData);
  }
  async update(
    filter: FilterQuery<SubjectClass>,
    updateData: UpdateSubjectClassDTO
  ): Promise<boolean> {
    await this.checkDependency(updateData);
    return super.update(filter, updateData);
  }
  async find(
    searchSubjectClass: SearchSubjectClassDTO,
    queryOption?: QueryOption<SubjectClass>
  ): Promise<SubjectClass[]> {
    const { teacherId, subjectId, page, pageSize, academicYear } =
      searchSubjectClass;
    const conditionSearch: FilterQuery<SubjectClass> = {
      ...(subjectId ? { subjectId } : {}),
      ...(teacherId ? { teacherId } : {}),
      ...(academicYear ? { academicYear } : {}),
    };

    return this.em.find(SubjectClass, conditionSearch, {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      populate: ["subject", "teacher"],
    });
  }
  async findOne(
    filter: FilterQuery<SubjectClass>,
    queryOption?: QueryOption<SubjectClass>
  ): Promise<any> {
    return this.em.find(SubjectClass, filter, {
      populate: ["subject", "teacher"],
    });
  }
}
