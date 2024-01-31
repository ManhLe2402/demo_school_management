import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class IsId implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (Types.ObjectId.isValid(value)) return value;

        throw new BadRequestException("Value must be mongoId.");
    }
}
