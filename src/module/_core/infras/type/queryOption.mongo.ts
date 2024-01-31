import { Sort } from "./sort";

export interface QueryOption {
    select?: string;
    sort?: Sort;
    order?: 1 | -1 | "asc" | "desc";
    skip?: number;
    limit?: number;
    getter?: boolean;
}

export interface QueryOptionWithLean extends QueryOption {
    lean?: boolean;
    leanGetter?: boolean;
}

export interface CreateOption {
    getter?: boolean;
}
