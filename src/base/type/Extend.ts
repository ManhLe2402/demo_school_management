import { IntersectionType, OmitType } from "@nestjs/mapped-types";

export type Extend<T, R> = Omit<T, keyof R> & R;

export const ExtendType = (T, R) => IntersectionType(OmitType(T, R), R);
