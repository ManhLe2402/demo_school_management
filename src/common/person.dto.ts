import { Property } from "@mikro-orm/core";
import { DTOCommon } from "./common.dto";
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  isNotEmpty,
} from "class-validator";

export class CreatePersonDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["male", "female"])
  gender: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  @Length(10)
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string = null;
}
