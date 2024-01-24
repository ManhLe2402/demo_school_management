import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SubjectClassService } from "./subjectClass.service";
import {
  CreateSubjectClassDTO,
  UpdateSubjectClassDTO,
} from "./subjectClass.dto";
import { EntityManager, UuidType } from "@mikro-orm/core";
import { ISuccessResponse } from "src/common/response/success.response";

@Controller("subjectclass")
export class SubjectClassController {
  constructor(private readonly subjectClassService: SubjectClassService) {}
  @Post()
  async create(
    @Body() subjectClass: CreateSubjectClassDTO
  ): Promise<ISuccessResponse<CreateSubjectClassDTO>> {
    const condition =
      new Date(subjectClass.startAt) > new Date(subjectClass.endAt);
    if (condition) {
      throw new HttpException(
        "startAt must be smaller than endAt",
        HttpStatus.BAD_REQUEST
      );
    }
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
  async update(
    @Body() newSubjectClass: UpdateSubjectClassDTO
  ): Promise<ISuccessResponse<UpdateSubjectClassDTO>> {
    const condition =
      new Date(newSubjectClass.startAt) > new Date(newSubjectClass.endAt);
    if (condition) {
      throw new HttpException(
        "startAt must be smaller than endAt",
        HttpStatus.BAD_REQUEST
      );
    }

    const data = await this.subjectClassService.update(newSubjectClass);
    return { status: "Update success", data };
  }
  @Delete(":id")
  async delete(@Param() id: UuidType): Promise<ISuccessResponse<string>> {
    try {
      const data = await this.subjectClassService.delete(id);
      return { status: "Delete Success", data };
    } catch (error) {
      throw new HttpException("Delete Fail", HttpStatus.BAD_REQUEST);
    }
  }
}
