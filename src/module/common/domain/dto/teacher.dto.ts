import { Exclude, Expose, Transform } from "class-transformer";
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  isNotEmpty,
} from "class-validator";
import { CreatePersonDTO } from "./common/person.dto";
import { SearchCommonDTO } from "./common/search.dto";

export class CreateTeacherDTO extends CreatePersonDTO {
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  yearStartTeaching: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @IsIn(["active", "inactive"])
  teachingStatus: string;

  @IsNotEmpty()
  @IsUUID()
  @Expose()
  schoolId: string;

  @Transform(({ value }) => value, { toClassOnly: true })
  unknowProperty: unknown;
}

export class GetTeacherDTO extends CreateTeacherDTO {
  @Expose()
  id: string;

  @Exclude()
  schoolId: string;
}

export class UpdateTeacherDTO extends CreateTeacherDTO {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Exclude()
  unknowProperty: never;
}

export class SearchTeacherDTO extends SearchCommonDTO {
  @IsOptional()
  @Expose()
  fullName: string;

  @IsOptional()
  @Expose()
  @IsUUID()
  schoolId: string;
}
