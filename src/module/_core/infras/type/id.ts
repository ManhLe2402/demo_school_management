import { Types } from "mongoose";

export type Id<T = string | Types.ObjectId> = T;

export function Id(id: Id): Id {
    return new Types.ObjectId(id);
}
