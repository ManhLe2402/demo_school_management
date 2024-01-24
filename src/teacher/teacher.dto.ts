import { Exclude, Expose, Transform } from "class-transformer";
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  isNotEmpty,
} from "class-validator";
import { CreatePersonDTO } from "src/common/person.dto";

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
  unwantedProperty?: any;
}

export class GetTeacherDTO extends CreateTeacherDTO {
  @Expose()
  id: string;

  @Exclude()
  teachingStatus: string;

  @Exclude()
  schoolId: string;
}

export class UpdateTeacherDTO extends CreateTeacherDTO {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Exclude()
  unwantedProperty: never;
}
