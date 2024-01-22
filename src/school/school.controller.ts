import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";

import { SchoolEntity } from "./school.entity";
import { SchoolService } from "./school.service";
import { CreateSchoolDTO } from "./school.dto";
import { UuidType } from "@mikro-orm/core";

@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  @Post()
  async create(
    @Body() school: CreateSchoolDTO
  ): Promise<{ status: string; data: CreateSchoolDTO }> {
    try {
      const data = await this.schoolService.create(school);
      return { status: "Create success", data: data };
    } catch (error) {
      throw new HttpException("Create Fail", HttpStatus.BAD_REQUEST);
    }
  }
  @Get(":id")
  findOneSchool(@Param("id") id: UuidType) {
    return this.schoolService.findOne(id);
  }
}
