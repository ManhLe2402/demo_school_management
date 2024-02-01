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
import { SubjectService } from "../../domain/service/subject";

import {
  CreateSubjectDTO,
  SearchSubjectDTO,
  UpdateSubjectDTO,
} from "../../domain/dto/subject.dto";

@Controller("v1/subject")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async create(@Body() newSubject: CreateSubjectDTO) {
    return this.subjectService.create(newSubject);
  }

  @Get()
  async findAll(@Query() searchSubject: SearchSubjectDTO) {
    return this.subjectService.find(searchSubject);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.subjectService.findOne(id);
  }

  @Put()
  async update(@Body() updateSubject: UpdateSubjectDTO) {
    return this.subjectService.update({ id: updateSubject.id }, updateSubject);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.subjectService.delete(id);
  }
}
