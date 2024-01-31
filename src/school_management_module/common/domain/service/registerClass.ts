import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  BaseService,
  ICreateOption,
} from "src/module/_core/domain/service/base.pg";
import { RegisterClass } from "../model/registerClass";
import {
  CreateRegisterClassDTO,
  UpdateRegisterClassDTO,
} from "../dto/registerClass.dto";
import { RegisterClassRepository } from "../repository/registerClass";
import { GetSubjectClassDTO } from "../dto/subjecClass.dto";
import { EntityManager } from "@mikro-orm/postgresql";
import { Student } from "../model/student";
import { SubjectClass } from "../model/subjectClass";
import { Subject } from "../model/subject";
import { v4 as uuidv4 } from "uuid";

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

  async conditionRegister(resgiterClassForm: CreateRegisterClassDTO) {
    const now = new Date().getTime();

    const inforSubjectClass = await this.em.findOne(
      SubjectClass,
      {
        id: resgiterClassForm.subjectClassId,
      },
      { populate: ["subject"] }
    );

    if (!inforSubjectClass) {
      throw new HttpException("Subject Class Not Found", HttpStatus.NOT_FOUND);
    }
    if (new Date(inforSubjectClass.startAt).getTime() < now) {
      throw new HttpException("Expired Registration", HttpStatus.BAD_REQUEST);
    }
    if (inforSubjectClass.classStatus === "unactive") {
      throw new HttpException("Canceled Class ", HttpStatus.BAD_REQUEST);
    }
    const inforStudent = await this.em.findOne(Student, {
      id: resgiterClassForm.studentId,
    });
    if (inforStudent.enrollmentStatus !== "active") {
      throw new HttpException(
        "Student Cannot RegisterClass",
        HttpStatus.BAD_REQUEST
      );
    }
    if (!inforStudent) {
      throw new HttpException("Student Not Found", HttpStatus.NOT_FOUND);
    }
    const registerList = await this.em.find(
      RegisterClass,
      {
        subjectClassId: resgiterClassForm.subjectClassId,
      },
      { disableIdentityMap: true }
    );

    if (registerList.length >= 200) {
      throw new HttpException("Class Fully", HttpStatus.BAD_REQUEST);
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
      throw new HttpException(
        "Can only register the same level",
        HttpStatus.BAD_REQUEST
      );
    }
    if (
      registerList.some((item) => {
        if (typeof item.studentId === "object" && item.studentId !== null) {
          if ((item.studentId as Student)?.id === resgiterClassForm.studentId)
            return true;
          return false;
        } else {
          return false;
        }
      })
    ) {
      throw new HttpException(
        "Student Have Registered",
        HttpStatus.BAD_REQUEST
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
}
