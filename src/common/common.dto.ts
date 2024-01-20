import { IsDate } from "class-validator";

export class DTOCommon {
  @IsDate()
  createAt = new Date();
}
