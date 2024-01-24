import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDTO } from "./student.dto";
import { ISuccessResponse } from "src/common/response/success.response";

@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  async create(
    @Body() student: CreateStudentDTO
  ): Promise<ISuccessResponse<CreateStudentDTO>> {
    const data = await this.studentService.create(student);
    return { status: "Create Success", data };
  }
}
