import { Exclude, Expose, Transform } from "class-transformer";
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateSubjectClassDTO {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  teacherId: string;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  subjectId: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  maxQuantity: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  minQuantity: number;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  startAt: Date;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  endAt: Date;

  @Expose()
  @IsNotEmpty()
  @IsString()
  classRoom: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  academicYear: number;

  @Expose()
  @IsString()
  @IsIn(["active", "unactive"])
  classStatus: string;

  @Transform(({ value }) => value, { toClassOnly: true })
  unwantedProperty?: any;
}

export class GetSubjectClassDTO extends CreateSubjectClassDTO {
  @Expose({ toClassOnly: true })
  id: string;
}
export class UpdateSubjectClassDTO extends CreateSubjectClassDTO {
  @Expose()
  @IsNotEmpty()
  id: string;

  @Exclude()
  unwantedProperty: never;
}
