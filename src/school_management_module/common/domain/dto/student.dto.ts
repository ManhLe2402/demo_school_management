import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { CreatePersonDTO } from "./common/person.dto";
import { SearchCommonDTO } from "./common/search.dto";

export class CreateStudentDTO extends CreatePersonDTO {
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @IsIn(["active", "inactive", "cessation", "reserve"])
  enrollmentStatus: string;

  @IsUUID()
  @IsNotEmpty()
  schoolId: string;
}

export class SearchStudentDTO extends SearchCommonDTO {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  level: number;

  @IsOptional()
  @IsIn(["active", "inactive"])
  enrollmentStatus: string;
}
export class UpdateStudentDTO extends CreateStudentDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class GetStudentDTO extends CreateStudentDTO {
  id: string;

  @Exclude()
  schoolId: string;
}
