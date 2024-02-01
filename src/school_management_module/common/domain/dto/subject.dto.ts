import { Exclude, Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { SearchCommonDTO } from "./common/search.dto";

export class CreateSubjectDTO {
  @IsNotEmpty()
  @IsString()
  subjectName: string;

  @IsNotEmpty()
  @IsNumber()
  level: number;

  @IsNotEmpty()
  @IsNumber()
  creditHour: number;

  @IsOptional()
  @IsString()
  subjectStatus: string;
}

export class GetSubjectDTO extends CreateSubjectDTO {
  id: string;
}
export class UpdateSubjectDTO extends CreateSubjectDTO {
  @IsNotEmpty()
  @IsNumber()
  id: string;
}
export class SearchSubjectDTO extends SearchCommonDTO {
  @IsOptional()
  @IsString()
  subjectName: string;
}
