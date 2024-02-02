import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  BaseService,
  ICreateOption,
} from "src/module/_core/domain/service/base.pg";
import { RegisterClass } from "../model/registerClass";
import {
  CreateRegisterClassDTO,
  SearchRegisterClassDTO,
  UpdateRegisterClassDTO,
} from "../dto/registerClass.dto";
import { RegisterClassRepository } from "../repository/registerClass";
import { GetSubjectClassDTO } from "../dto/subjecClass.dto";
import { EntityManager, FilterQuery, Loaded } from "@mikro-orm/postgresql";
import { Student } from "../model/student";
import { SubjectClass } from "../model/subjectClass";
import { Subject } from "../model/subject";
import { v4 as uuidv4 } from "uuid";
import { ClientExeption } from "src/module/_core/infras/exception/clientException";
import { QueryOption } from "src/module/_core/infras/type/queryOption.pg";

@Injectable()
export class RegisterClassService extends BaseService<
  RegisterClass,
  CreateRegisterClassDTO,
  UpdateRegisterClassDTO
> {
  constructor(
    private readonly registerClassRepository: RegisterClassRepository,
    private readonly em: EntityManager
  ) {
    super(registerClassRepository);
  }

  async conditionRegister(
    resgiterClassForm: CreateRegisterClassDTO | UpdateRegisterClassDTO
  ) {
    const now = new Date().getTime();

    const inforSubjectClass = await this.em.findOne(
      SubjectClass,
      {
        id: resgiterClassForm.subjectClassId,
      },
      { populate: ["subject"] }
    );

    if (!inforSubjectClass) {
      throw new ClientExeption("Lớp học không tồn tại!");
    }
    if (new Date(inforSubjectClass.startAt).getTime() < now) {
      throw new ClientExeption("Hết hạn đăng ký!");
    }
    if (inforSubjectClass.classStatus === "inactive") {
      throw new ClientExeption("Lớp đã bị hủy!");
    }
    const inforStudent = await this.em.findOne(Student, {
      id: resgiterClassForm.studentId,
    });
    if (inforStudent.enrollmentStatus !== "active") {
      throw new ClientExeption(
        `${inforStudent.level < 12 ? "Học sinh" : "Sinh viên"} không thể đăng ký lớp!`
      );
    }
    if (!inforStudent) {
      throw new ClientExeption(
        `${inforStudent.level < 12 ? "Học sinh" : "Sinh viên"} không tồn tại!`
      );
    }
    const registerList = await this.em.find(
      RegisterClass,
      {
        subjectClassId: resgiterClassForm.subjectClassId,
      },
      { disableIdentityMap: true }
    );

    if (registerList.length >= 200) {
      throw new ClientExeption("Lớp đầy!");
    }

    const checkLevel = () => {
      if (
        typeof inforSubjectClass.subjectId === "object" &&
        inforSubjectClass.subjectId !== null
      ) {
        if (
          (inforSubjectClass.subjectId as Subject)?.level !== inforStudent.level
        )
          return true;
        return false;
      }
      return false;
    };
    if (inforStudent.level <= 12 && checkLevel()) {
      throw new ClientExeption("Chỉ có thể đăng kí lớp cùng level!");
    }

    if (
      registerList.some(
        (item) => item.studentId === resgiterClassForm.studentId
      )
    ) {
      throw new ClientExeption(
        `${inforStudent.level < 12 ? "Học sinh" : "Sinh viên"} đã đăng ký lớp này!`
      );
    }
  }
  async create(createData: CreateRegisterClassDTO) {
    await this.conditionRegister(createData);
    return super.create(createData);
  }

  async update(updateData: UpdateRegisterClassDTO): Promise<boolean> {
    await this.conditionRegister(updateData);
    return super.update({ id: updateData.id }, updateData);
  }

  async findAndCount(
    searchRegister: SearchRegisterClassDTO,
    queryOption?: QueryOption<RegisterClass>
  ): Promise<[Loaded<RegisterClass, never, "*", never>[], number]> {
    const { page, pageSize, studentId, subjectClassId } = searchRegister;
    const conditionSearch: FilterQuery<RegisterClass> = {
      ...(studentId ? { studentId } : {}),
      ...(subjectClassId ? { subjectClassId } : {}),
    };
    queryOption = {
      ...queryOption,
      page,
      pageSize,
      populate: [
        "subjectClass",
        "student",
        "subjectClass.teacher",
        "subjectClass.subject",
      ],
    };

    return super.findAndCount(conditionSearch, queryOption);
  }
}
