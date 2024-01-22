import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  isNotEmpty,
} from "class-validator";
import { CreatePersonDTO } from "src/common/person.dto";

export class CreateTeacherDTO extends CreatePersonDTO {
  @IsNumber()
  @IsNotEmpty()
  yearStartTeaching: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(["active", "inactive"])
  teachingStatus: string;

  @IsNotEmpty()
  @IsString()
  schoolId: string;
}
