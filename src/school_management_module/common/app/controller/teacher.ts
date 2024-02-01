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
import { TeacherService } from "../../domain/service/teacher";
import {
  CreateTeacherDTO,
  SearchTeacherDTO,
  UpdateTeacherDTO,
} from "../../domain/dto/teacher.dto";
import { FilterQuery } from "@mikro-orm/core";
import { Teacher } from "../../domain/model/teacher";

@Controller("v1/teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() newTeacher: CreateTeacherDTO) {
    return this.teacherService.create(newTeacher);
  }

  @Get()
  async findAll(@Query() searchTeacherDTO: SearchTeacherDTO) {
    const { fullName, schoolId, page, pageSize } = searchTeacherDTO;
    const conditionSearch: FilterQuery<Teacher> = {
      ...(fullName
        ? {
            $or: [
              { firstName: { $like: `%${fullName}%` } },
              { lastName: { $like: `%${fullName}%` } },
            ],
          }
        : {}),
      ...(schoolId ? { schoolId } : {}),
    };
    return this.teacherService.find(searchTeacherDTO);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.teacherService.findOne({ id });
  }

  @Put()
  async update(@Body() updateTeacher: UpdateTeacherDTO) {
    return this.teacherService.update({ id: updateTeacher.id }, updateTeacher);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.teacherService.delete(id);
  }
}
