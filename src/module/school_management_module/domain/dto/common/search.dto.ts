import { IsOptional } from "class-validator";

export class SearchCommonDTO {
  @IsOptional()
  page: number = 1;

  @IsOptional()
  pageSize: number = 30;
}
