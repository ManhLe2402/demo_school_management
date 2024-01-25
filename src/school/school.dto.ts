import { Expose, Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from "class-validator";

export class CreateSchoolDTO {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  schoolName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  address: string;

  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  hotline: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  dateEstablished: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  typeOfEducation: number;

  @Expose()
  @IsString()
  description: string = "";

  @Transform(({ value }) => value, { toClassOnly: true })
  unwantedProperty?: any;
}

export class GetDataSchoolDTO extends CreateSchoolDTO {
  @Expose()
  id: string;
}
