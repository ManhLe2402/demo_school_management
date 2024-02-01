import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { RegisterClassService } from "../../domain/service/registerClass";

import {
  CreateRegisterClassDTO,
  SearchRegisterClassDTO,
  UpdateRegisterClassDTO,
} from "../../domain/dto/registerClass.dto";

@Controller("v1/register_class")
export class RegisterClassController {
  constructor(private readonly registerClassService: RegisterClassService) {}

  @Post()
  async create(@Body() newRegisterClass: CreateRegisterClassDTO) {
    return this.registerClassService.create(newRegisterClass);
  }

  @Get()
  async findAll(@Query() searchRegister: SearchRegisterClassDTO) {
    return this.registerClassService.find(searchRegister);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.registerClassService.findOne(id);
  }

  @Put()
  async update(@Body() updateRegisterClass: UpdateRegisterClassDTO) {
    return this.registerClassService.update(updateRegisterClass);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.registerClassService.delete(id);
  }
}
