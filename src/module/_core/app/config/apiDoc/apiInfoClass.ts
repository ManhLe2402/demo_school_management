import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

interface IApiInfoClass {
    tags?: string[];
}

export const ApiInfoClass = (options: IApiInfoClass = {}) => {
    const chainDecors = [];

    if (options.tags) chainDecors.push(ApiTags(...options.tags));

    if (options.tags.includes("_Admin")) {
        chainDecors.push(ApiBearerAuth());
        chainDecors.push(
            ApiResponse({
                status: HttpStatus.UNAUTHORIZED,
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            errorCode: HttpStatus.BAD_REQUEST,
                            message: "Mô tả lỗi token không hợp lệ, Unauthorized, ..."
                        }
                    }
                }
            })
        );
    }

    return applyDecorators(...chainDecors);
};
