import { Exclude } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from "class-validator";
import { DTOCommon } from "src/common/common.dto";

export class CreateSchoolDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  schoolName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  address: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  hotline: string;

  @IsNotEmpty()
  @IsNumber()
  dateEstablished: number;

  @IsNotEmpty()
  @IsNumber()
  typeOfEducation: number;

  @IsString()
  description: string = "";
}
