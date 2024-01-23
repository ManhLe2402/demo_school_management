import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDTO } from "./teacher.dto";
import { ISuccessResponse } from "src/common/response/success.response";

@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}
  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { strategy: "excludeAll" },
    })
  )
  async create(
    @Body() teacher: CreateTeacherDTO
  ): Promise<ISuccessResponse<CreateTeacherDTO>> {
    console.log("checkBody-------------", teacher);
    const data = await this.teacherService.create(teacher);
    return { status: "Create succsess", data: data };
  }
}
