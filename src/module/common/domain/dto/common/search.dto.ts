import { IsOptional } from "class-validator";

export class SearchCommonDTO {
  @IsOptional()
  page: number;

  @IsOptional()
  pageSize: number;
}
