import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { GetSubjectDTO } from "./subject.dto";
import { GetTeacherDTO } from "./teacher.dto";
import { SearchCommonDTO } from "./common/search.dto";

export class CreateSubjectClassDTO {
  @IsNotEmpty()
  @IsUUID()
  teacherId: string;

  @IsNotEmpty()
  @IsUUID()
  subjectId: string;

  @IsNotEmpty()
  @IsNumber()
  maxQuantity: number;

  @IsNotEmpty()
  @IsNumber()
  minQuantity: number;

  @IsNotEmpty()
  @IsDateString()
  startAt: Date;

  @IsNotEmpty()
  @IsDateString()
  endAt: Date;

  @IsNotEmpty()
  @IsString()
  classRoom: string;

  @IsNotEmpty()
  @IsNumber()
  academicYear: number;

  @IsString()
  @IsIn(["active", "inactive"])
  classStatus: string;
}

export class GetSubjectClassDTO extends CreateSubjectClassDTO {
  id: string;

  @Type(() => GetSubjectDTO)
  subjectId: string;

  @Type(() => GetTeacherDTO)
  teacherId: string;
}

export class UpdateSubjectClassDTO extends CreateSubjectClassDTO {
  @IsNotEmpty()
  id: string;
}

export class SearchSubjectClassDTO extends SearchCommonDTO {
  @IsOptional()
  @IsUUID()
  subjectId: string;

  @IsOptional()
  @IsUUID()
  teacherId: string;

  @IsOptional()
  @IsNumber()
  academicYear: number;
}
