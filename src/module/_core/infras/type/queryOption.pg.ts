import { EntityField } from "@mikro-orm/core";
import { OrderQuery, Sort } from "./sort";

export interface QueryOption<T = any> {
  /**
   * Don't trust "select", select will return maybe weird result if populate in deep level that
   * join it self. Always test result if having complex population or select join.
   */
  select?: EntityField<T>[] | string[];
  sort?: Sort;
  order?: OrderQuery;
  page?: number;
  pageSize?: number;
}

export interface CreateOption {
  excludeRelation?: boolean;
}

export interface UpdateOption {
  flush?: boolean;
  excludeRelation?: boolean;
}
