import { IntersectionType, OmitType } from "@nestjs/swagger";

export const MergeTypeApi = (T, R) => IntersectionType(OmitType(T, R), R);
