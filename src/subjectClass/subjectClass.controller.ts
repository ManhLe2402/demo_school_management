import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SubjectClassService } from "./subjectClass.service";
import { CreateSubjectClassDTO, UpdateSubjectClassDTO } from "./subjectClass.dto";
import { EntityManager } from "@mikro-orm/core";
import { ISuccessResponse } from "src/common/response/success.response";

@Controller("subjectclass")
export class SubjectClassController {
  constructor(private readonly subjectClassService: SubjectClassService) {}
  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { strategy: "excludeAll" },
    })
  )
  async create(
    @Body() subjectClass: CreateSubjectClassDTO
  ): Promise<ISuccessResponse<CreateSubjectClassDTO>> {
    const data = await this.subjectClassService.create(subjectClass);
    return {
      status: "Create success",
      data,
    };
  }
  @Get()
  fetchDataWithPagination(
    @Query("page") page: number = 1,
    @Query("pageSize") pageSize: number = 20
  ) {
    return this.subjectClassService.fetchDataWithPagination(page, pageSize);
  }
  @Put()
  async update(@Body() newSubjectClass:UpdateSubjectClassDTO):Promise<ISuccessResponse<UpdateSubjectClassDTO>>{
    const data =await this.subjectClassService.update(newSubjectClass)
    return {status:"Update success",data}
  }
}
