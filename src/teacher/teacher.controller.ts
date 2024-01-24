import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import {
  CreateTeacherDTO,
  GetTeacherDTO,
  UpdateTeacherDTO,
} from "./teacher.dto";
import { ISuccessResponse } from "src/common/response/success.response";
import { PaginationDTO, SearchTeacherDTO } from "src/style/dto/search.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import { UuidType } from "@mikro-orm/core";

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
  @Get()
  async find(
    @Query() searchTeacher: SearchTeacherDTO
  ): Promise<ISuccessResponse<GetTeacherDTO[]>> {
    // console.log(
    //   plainToClass(PaginationDTO, searchTeacher, {
    //     excludeExtraneousValues: true,
    //   })
    // );
    const dataFind = await this.teacherService.find(searchTeacher);
    let data: GetTeacherDTO[] = [];
    if (dataFind) {
      data = dataFind.map((item) =>
        plainToClass(GetTeacherDTO, item, { excludeExtraneousValues: true })
      );
    }
    return { status: "Get Data SuccessFully", data };
  }
  @Put()
  async update(
    @Body() newTeacher: UpdateTeacherDTO
  ): Promise<ISuccessResponse<UpdateTeacherDTO>> {
    return await this.teacherService.update(newTeacher);
  }

  @Delete(":id")
  async delelte(@Param("id") id: UuidType): Promise<ISuccessResponse<string>> {
    const data = await this.teacherService.delete(id);
    return {
      status: "Delete Successfully",
      data: `Deleted the Teacher Id= ${data.id}`,
    };
  }
}
