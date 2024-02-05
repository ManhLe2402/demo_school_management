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
}
