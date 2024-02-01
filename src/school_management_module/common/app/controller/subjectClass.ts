import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { SubjectClassService } from "../../domain/service/subjectClass";

import { UuidType } from "@mikro-orm/core";
import { SubjectClass } from "../../domain/model/subjectClass";
import {
  CreateSubjectClassDTO,
  SearchSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "../../domain/dto/subjecClass.dto";

@Controller("v1/subjectClass")
export class SubjectClassController {
  constructor(private readonly subjectClassService: SubjectClassService) {}

  @Post()
  async create(@Body() newSubjectClass: CreateSubjectClassDTO) {
    return this.subjectClassService.create(newSubjectClass);
  }

  @Get()
  async findAll(@Query() SearchSubjectClassDTO: SearchSubjectClassDTO) {
    return this.subjectClassService.find(SearchSubjectClassDTO);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.subjectClassService.findOne({ id: id });
  }

  @Put()
  async update(@Body() updateSubjectClass: UpdateSubjectClassDTO) {
    return this.subjectClassService.update(
      { id: updateSubjectClass.id },
      updateSubjectClass
    );
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.subjectClassService.delete(id);
  }
}
