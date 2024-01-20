import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from "class-validator";

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
