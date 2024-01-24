import { Exclude, Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateRegisterClassDTO {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @Expose()
  @IsNotEmpty()
  @IsUUID()
  subjectClassId: string;

  @Expose()
  @IsString()
  status: string;

  @Transform(({ value }) => value, { toClassOnly: true })
  unknowProperty: unknown;
}

export class UpdateRegisterClassDTO extends CreateRegisterClassDTO {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Exclude()
  unknowProperty: never;
}
