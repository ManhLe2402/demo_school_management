import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { SchoolService } from "../../domain/service/school";
import { CreateTeacherDTO } from "../../domain/dto/teacher.dto";
import { CreateSchoolDTO, UpdateSchoolDTO } from "../../domain/dto/school.dto";
import { UuidType } from "@mikro-orm/core";
import { School } from "../../domain/model/school";

@Controller("v1/school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async create(@Body() newSchool: CreateSchoolDTO) {
    return this.schoolService.create(newSchool);
  }

  @Get()
  async findAll() {
    return this.schoolService.findAndCount({});
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.schoolService.findOne(id);
  }

  @Put()
  async update(@Body() updateSchool: UpdateSchoolDTO) {
    return this.schoolService.update({ id: updateSchool.id }, updateSchool);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.schoolService.delete(id);
  }
}
