import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/_core/domain/repository/base.pg";
import { SubjectClass } from "../model/subjectClass";
import { EntityManager, FilterQuery, Loaded } from "@mikro-orm/postgresql";
import {
  CreateSubjectClassDTO,
  SearchSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "../dto/subjecClass.dto";
import { TeacherRepository } from "./teacher";
import { SubjectRepository } from "./subject";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { ICreateOption } from "src/module/_core/domain/service/base.pg";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";

@Injectable()
export class SubjectClassRepository extends BaseRepository<SubjectClass> {
  constructor(
    protected readonly em: EntityManager,
    private readonly teacherRepository: TeacherRepository,
    private readonly subjectRepository: SubjectRepository
  ) {
    super(em, SubjectClass);
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
  async create(createDataDTO: CreateSubjectClassDTO) {
    await this.checkDependency(createDataDTO);

    return super.create(createDataDTO);
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

  async findAndCount(
    searchSubjectClass: SearchSubjectClassDTO,
    queryOption?: QueryOption<SubjectClass>
  ): Promise<[Loaded<SubjectClass, never, "*", never>[], number]> {
    const { teacherId, subjectId, page, pageSize, academicYear } =
      searchSubjectClass;
    queryOption = {
      ...queryOption,
      page,
      pageSize,
      populate: ["subject", "teacher"],
    };
    const conditionSearch: FilterQuery<SubjectClass> = {
      ...(subjectId ? { subjectId } : {}),
      ...(teacherId ? { teacherId } : {}),
      ...(academicYear ? { academicYear } : {}),
    };

    return super.findAndCount(conditionSearch, queryOption);
  }

  async findOne(
    filter: FilterQuery<SubjectClass>,
    queryOption?: QueryOption<SubjectClass>
  ): Promise<any> {
    return this.em.findOne(SubjectClass, filter, {
      populate: ["subject", "teacher"],
    });
  }
}
