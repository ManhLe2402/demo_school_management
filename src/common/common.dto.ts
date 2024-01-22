import { IsDate } from "class-validator";

export class DTOCommon {
  @IsDate()
  createAt: Date;

  @IsDate()
  updateAt: Date;
}
