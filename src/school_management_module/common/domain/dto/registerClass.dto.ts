import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

import { SearchCommonDTO } from "./common/search.dto";
import { v4 as uuidv4 } from "uuid";
import { GetStudentDTO } from "./student.dto";
import { GetSubjectClassDTO } from "./subjecClass.dto";

export class CreateRegisterClassDTO {
  id: string;
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
