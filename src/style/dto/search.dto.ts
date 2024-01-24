import { UuidType } from "@mikro-orm/core";
import { Expose } from "class-transformer";
import { IsOptional, IsUUID } from "class-validator";
export class PaginationDTO {
  @Expose()
  page: number;

  @Expose()
  pageSize: number;
}
export class SearchRegisterClassDTO extends PaginationDTO {
  @IsOptional()
  @Expose()
  @IsUUID()
  id: string;

  @IsOptional()
  @Expose()
  @IsUUID()
  studentId: string;

  @IsOptional()
  @Expose()
  @IsUUID()
  subjectClassId: string;
}

export class SearchTeacherDTO extends PaginationDTO {
  @IsOptional()
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  fullName: string;
}
