import { EntityField } from "@mikro-orm/core";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { OrderQuery, Sort } from "../../infras/type/sort";
import { APEnum } from "../config/apiDoc/apiField.decorator";
import { EntityState } from "../../infras/type/entityState.enum";
import { QueryOption } from "../../infras/type/queryOption.pg";

/*
    Handle query params from request.
    Example: 
    xyz.com/a/b?
    page=1&
    pageSize=2&
    sort=-name,+phone,-createdAt&
*/
export class BaseQueryApiDto<T = any> implements QueryOption<T> {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageSize?: number = 20;

  @IsOptional()
  @Transform(({ value }) => {
    const sortObject = {};
    const sortArray: string[] = value.split(",");
    sortArray.forEach((sort) => {
      if (sort[0] == "+") sortObject[sort.substring(1)] = OrderQuery.ASC;
      else if (sort[0] == "-") sortObject[sort.substring(1)] = OrderQuery.DESC;
      else sortObject[sort] = OrderQuery.ASC;
    });

    return sortObject;
  })
  sort?: Sort = { id: OrderQuery.DESC };

  // Deprecated, use sort only
  @IsOptional()
  @IsEnum(OrderQuery)
  order?: OrderQuery = OrderQuery.DESC;

  // Depend on each request, need document specify for each request
  select?: EntityField<T>[];
}

export class BaseQueryApiWithStatusDto extends BaseQueryApiDto {
  @APEnum(EntityState)
  @IsOptional()
  @IsEnum(EntityState)
  status?: EntityState;
}

// export const excludeBaseQuery = <T extends BaseQueryApiDto>(filter: T) => {
//     const newFilter = { ...filter };
//     ["page", "pageSize", "sort", "order"].forEach((a) => {
//         delete newFilter[a];
//     });

//     return newFilter as Omit<T, "page" | "pageSize" | "sort" | "order">;
// };
