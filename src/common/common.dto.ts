import { Expose } from "class-transformer";
import { IsDate, IsUUID } from "class-validator";

export class CommonDTO {
  @IsUUID()
  @Expose({ toClassOnly: true })
  id: string;

  @IsDate()
  @Expose({ toClassOnly: true })
  createAt: Date;

  @Expose()
  @IsDate()
  updateAt: Date;

  @IsDate()
  @Expose({ toClassOnly: true })
  delete: Date;
}
