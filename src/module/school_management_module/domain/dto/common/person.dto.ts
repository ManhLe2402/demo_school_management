import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Expose } from "class-transformer";

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

  @IsOptional()
  @IsEmail()
  email: string = null;
}
