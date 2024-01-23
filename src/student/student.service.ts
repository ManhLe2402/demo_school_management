import { EntityManager } from "@mikro-orm/core";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateStudentDTO } from "./student.dto";
import { ISuccessResponse } from "src/common/response/success.response";
import {v4 as uuid} from "uuid"
import { StudentEntity } from "./student.entity";
@Injectable()
export class StudentService{
  constructor(private readonly em: EntityManager){}
  async create(student:CreateStudentDTO):Promise<CreateStudentDTO> {
   try {
     const id= uuid()
    const newStudent = this.em.create(StudentEntity,{id,...student})
    await this.em.persistAndFlush(newStudent)
    return newStudent
   } catch (error) {
   throw new HttpException("Create Fail",HttpStatus.BAD_REQUEST)
   }
   
  }
}