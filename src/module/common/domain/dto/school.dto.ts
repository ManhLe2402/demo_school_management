import { Exclude, Expose, Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";
import { CommonSearchDTO } from "src/common/common.dto";
import { SearchCommonDTO } from "./common/search.dto";

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

  @IsOptional()
  @IsString()
  description: string = "";
}

export class GetSchoolDTO extends CreateSchoolDTO {
  id: string;
}

export class UpdateSchoolDTO extends CreateSchoolDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
export class SearchSchoolDTO extends SearchCommonDTO {
  @IsOptional()
  @IsString()
  schoolName: string;
}
