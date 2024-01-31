import { PipeTransform, Injectable, ArgumentMetadata, mixin } from "@nestjs/common";

export function ImageValidationPipe(options = { required: true }) {
    @Injectable()
    class ImageValidationPipe implements PipeTransform {
        transform(value: any, metadata: ArgumentMetadata) {
            const { required } = options;

            if (required) {
                if (value === undefined) throw new Error("File must be include !");
            }

            return value;
        }
    }
    return mixin(ImageValidationPipe);
}
