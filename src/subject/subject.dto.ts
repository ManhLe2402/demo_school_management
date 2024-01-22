import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubjectDTO {
  @IsNotEmpty()
  @IsString()
  subjectName: string;

  @IsNotEmpty()
  @IsNumber()
  level!: number;

  @IsNotEmpty()
  @IsNumber()
  creditHour!: number;

  @IsString()
  subjectStatus: string;
}
