import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { CommonSearchDTO } from "src/common/common.dto";
import { GetStudentDTO } from "src/student/student.dto";
import { GetSubjectClassDTO } from "src/subjectClass/subjectClass.dto";
import { SearchCommonDTO } from "./common/search.dto";

export class CreateRegisterClassDTO {
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @IsNotEmpty()
  @IsUUID()
  subjectClassId: string;

  @IsString()
  status: string;
}

export class UpdateRegisterClassDTO extends CreateRegisterClassDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class SearchRegisterClassDTO extends SearchCommonDTO {
  @IsOptional()
  @IsUUID()
  studentId: string;

  @IsOptional()
  @IsUUID()
  subjectClassId: string;
}

export class GetRegisterClassDTO extends UpdateRegisterClassDTO {
  @Type(() => GetStudentDTO)
  studentId: string;

  @Type(() => GetSubjectClassDTO)
  subjectClassId: string;
}
