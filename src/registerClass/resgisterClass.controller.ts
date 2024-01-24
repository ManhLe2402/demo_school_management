import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  CreateRegisterClassDTO,
  UpdateRegisterClassDTO,
} from "./registerClass.dto";
import { ISuccessResponse } from "src/common/response/success.response";
import { ResgisterSubjectClassService } from "./registerClass.Service";
import { SearchRegisterClassDTO } from "src/style/dto/search.dto";
import { UuidType } from "@mikro-orm/core";

@Controller("register_class")
export class RegisterClassController {
  constructor(
    private readonly registerClassService: ResgisterSubjectClassService
  ) {}
  @Post()
  async create(
    @Body() registerClassForm: CreateRegisterClassDTO
  ): Promise<ISuccessResponse<CreateRegisterClassDTO>> {
    return await this.registerClassService.create(registerClassForm);
  }
  @Post("find")
  async find(@Body() formSearch: SearchRegisterClassDTO) {
    return await this.registerClassService.find(formSearch);
  }

  @Put()
  async update(
    @Body() updateRegisterClass: UpdateRegisterClassDTO
  ): Promise<ISuccessResponse<CreateRegisterClassDTO>> {
    return await this.registerClassService.update(updateRegisterClass);
  }
  @Delete("id")
  async delete(@Param() id: UuidType): Promise<ISuccessResponse<string>> {
    return this.registerClassService.delete(id);
  }
}
