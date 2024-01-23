import { Expose } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { CreatePersonDTO } from "src/common/person.dto";

export class CreateStudentDTO extends CreatePersonDTO {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @Expose()
  @IsIn(["active", "unactive", "cessation", "reserve"])
  enrollmentStatus: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  schoolId: string;
}
