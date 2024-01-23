import {
  HttpException,
  HttpStatus,
  Injectable,
  ParseIntPipe,
} from "@nestjs/common";
import {
  CreateSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "./subjectClass.dto";
import { ISuccessResponse } from "src/common/response/success.response";
import { v4 as uuidv4 } from "uuid";
import { EntityManager, wrap } from "@mikro-orm/core";
import { SubjectClassEntity } from "./subjectClass.entity";

@Injectable()
export class SubjectClassService {
  constructor(private readonly em: EntityManager) {}
  async create(
    subjectClass: CreateSubjectClassDTO
  ): Promise<CreateSubjectClassDTO> {
    const id = uuidv4();
    const newSubjectClass = this.em.create(SubjectClassEntity, {
      id,
      ...subjectClass,
    });
    await this.em.persistAndFlush(newSubjectClass);
    return newSubjectClass;
  }

  async fetchDataWithPagination(page = 1, pageSize = 20) {
    try {
      const data = await this.em.findAndCount(
        SubjectClassEntity,
        {},
        {
          populate: ["subjectId", "teacherId"],
          limit: pageSize,
          offset: (page - 1) * pageSize,
        }
      );
      return data;
    } catch (error) {
      console.log("fetchDataWithPagination", error);
    }
  }

  async update(newSubjectClass: UpdateSubjectClassDTO) {
    try {
      const subjectClass = await this.em.findOneOrFail(
        SubjectClassEntity,
        newSubjectClass.id
      );
      wrap(subjectClass).assign(newSubjectClass);
      await this.em.persistAndFlush(subjectClass);
      return newSubjectClass;
    } catch (error) {
      throw new HttpException("Update Fail", HttpStatus.BAD_REQUEST);
    }
  }
}
