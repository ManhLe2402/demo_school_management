import { Body, Controller, Post } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDTO } from "./teacher.dto";
import { ISuccessResponse } from "src/common/response/success.response";

@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Post()
  async create(
    @Body() teacher: CreateTeacherDTO
  ): Promise<ISuccessResponse<CreateTeacherDTO>> {
    const data = await this.teacherService.create(teacher);
    return { status: "Create succsess", data: data };
  }
}
