import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { CreateSubjectDTO } from "./subject.dto";
import { ISuccessResponse } from "src/common/response/success.response";

@Controller("subject")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @Post()
  async create(
    @Body() subject: CreateSubjectDTO
  ): Promise<ISuccessResponse<CreateSubjectDTO>> {
    const data = await this.subjectService.create(subject);
    return { status: "Create success", data: subject };
  }

  @Get()
  async fetchDataWithPagination(
    @Query("page") page = 1,
    @Query("pageSize") pageSize = 20
  ) {
    return this.subjectService.findAll(+page, +pageSize);
  }
}
