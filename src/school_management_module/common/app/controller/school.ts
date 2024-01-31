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
import { SchoolService } from "../../domain/service/school";
import {
  CreateSchoolDTO,
  SearchSchoolDTO,
  UpdateSchoolDTO,
} from "../../domain/dto/school.dto";

@Controller("v1/school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async create(@Body() newSchool: CreateSchoolDTO) {
    return this.schoolService.create(newSchool);
  }

  @Get()
  async findAll(@Query() querySearch: SearchSchoolDTO) {
    const { page, pageSize, schoolName } = querySearch;
    console.log("schoolNameschoolNameschoolName", querySearch);
    return this.schoolService.find(
      schoolName ? { schoolName: { $like: `%${schoolName}%` } } : {},
      {
        page,
        pageSize,
      }
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.schoolService.findOne({ id });
  }

  @Put()
  async update(@Body() updateSchool: UpdateSchoolDTO) {
    return this.schoolService.findOneAndUpdate(
      { id: updateSchool.id },
      updateSchool
    );
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.schoolService.findOneAndDelete(id);
  }
}
