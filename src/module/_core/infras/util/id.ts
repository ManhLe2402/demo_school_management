import { Types } from "mongoose";
import { Id } from "../type/id";

export const toId = (id: Id) => {
  return new Types.ObjectId(id);
};
