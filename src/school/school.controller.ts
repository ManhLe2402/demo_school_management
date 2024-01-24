import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { SchoolEntity } from "./school.entity";
import { SchoolService } from "./school.service";
import { CreateSchoolDTO, GetDataSchoolDTO } from "./school.dto";
import { UuidType } from "@mikro-orm/core";
import { plainToClass, plainToInstance } from "class-transformer";

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
  async findOneSchool(@Param("id") id: UuidType) {
    const school = await this.schoolService.findOne(id);
    const schoolConvert = await plainToClass(GetDataSchoolDTO, school, {
      excludeExtraneousValues: true,
    });
    return schoolConvert;
  }
}
