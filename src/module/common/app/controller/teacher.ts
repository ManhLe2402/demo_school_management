import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { TeacherService } from "../../domain/service/teacher";
import {
  CreateTeacherDTO,
  UpdateTeacherDTO,
} from "../../domain/dto/teacher.dto";

@Controller("v1/teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() newTeacher: CreateTeacherDTO) {
    return this.teacherService.create(newTeacher);
  }

  @Get()
  async findAll() {
    return this.teacherService.find({});
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.teacherService.findOne(id);
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
