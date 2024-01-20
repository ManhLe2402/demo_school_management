import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { SchoolEntity } from "./school.entity";
import { SchoolService } from "./school.service";
import { CreateSchoolDTO } from "./school.dto";
import { UuidType } from "@mikro-orm/core";

@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Post()
  create(@Body() school: CreateSchoolDTO) {
    return this.schoolService.create(school);
  }
  @Get(":id")
  findOneSchool(@Param("id") id: UuidType) {
    return this.schoolService.findOne(id);
  }
}
