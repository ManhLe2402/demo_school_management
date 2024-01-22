import { Body, Controller, Post } from "@nestjs/common";
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
}
