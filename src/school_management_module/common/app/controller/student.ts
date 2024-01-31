import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { StudentService } from "../../domain/service/student";
import {
  CreateStudentDTO,
  UpdateStudentDTO,
} from "../../domain/dto/student.dto";

@Controller("v1/student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() newStudent: CreateStudentDTO) {
    return this.studentService.create(newStudent);
  }

  @Get()
  async findAll() {
    return this.studentService.find({});
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.studentService.findOne(id);
  }

  @Put()
  async update(@Body() updateStudent: UpdateStudentDTO) {
    return this.studentService.update({ id: updateStudent.id }, updateStudent);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.studentService.delete(id);
  }
}
