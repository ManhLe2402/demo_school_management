import { HttpStatus, applyDecorators } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiBodyOptions,
    ApiConsumes,
    ApiExcludeEndpoint,
    ApiOkResponse,
    ApiOperation,
    ApiOperationOptions,
    ApiParam,
    ApiParamOptions,
    ApiQuery,
    ApiQueryOptions,
    ApiResponse
} from "@nestjs/swagger";
import { IErrorResponseData } from "../type/dataResponse";
import { ReferenceObject, SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

interface IApiInfo extends ApiOperationOptions {
    hide?: boolean;
    okResponseSample?: object;
    okResponseType?: Function;
    errorResponses?: [number, Partial<IErrorResponseData>?, string?][];
    bearerAuth?: boolean;
    requiredQuery?: { [x: string]: [any, string] }[];
    optionalQuery?: { [x: string]: [any, string] }[];
    formData?: Record<string, ReferenceObject | SchemaObject>;
    apiQueryExtra?: ApiQueryOptions[];
    apiBody?: ApiBodyOptions;
    apiParam?: ApiParamOptions[];
}

export const ApiInfo = (options: IApiInfo = {}) => {
    const chainDecors = [ApiOperation(options)];
    if (options.hide == true) chainDecors.push(ApiExcludeEndpoint());

    if (options.bearerAuth) {
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

    if (options.okResponseSample || options.okResponseType)
        chainDecors.push(
            ApiOkResponse({
                ...(options.okResponseType && {
                    type: options.okResponseType
                }),
                ...(options.okResponseSample && {
                    content: {
                        "application/json": {
                            example: { status: true, data: options.okResponseSample }
                        }
                    }
                })
            })
        );

    if (options.errorResponses) {
        const errorResponses = options.errorResponses;

        errorResponses.forEach((errorResponse) => {
            chainDecors.push(
                ApiResponse({
                    status: errorResponse[0],
                    content: errorResponse[1] && {
                        "application/json": {
                            example: { status: false, errorCode: errorResponse[0], ...errorResponse[1] }
                        }
                    },
                    description: errorResponse[2]
                })
            );
        });
    }

    if (options.apiQueryExtra) {
        const apiQueryExtra = options.apiQueryExtra;

        apiQueryExtra.forEach((apiQuery) => {
            chainDecors.push(ApiQuery(apiQuery));
        });
    }

    if (options.apiParam) {
        const apiParam = options.apiParam;

        apiParam.forEach((param) => {
            chainDecors.push(ApiParam(param));
        });
    }

    if (options.formData) {
        chainDecors.push(ApiConsumes("multipart/form-data"));
        chainDecors.push(
            ApiBody({
                schema: {
                    type: "object",
                    properties: options.formData
                }
            })
        );
    }

    if (options.apiBody) {
        chainDecors.push(ApiBody(options.apiBody));
    }

    chainDecors.push(
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            content: {
                "application/json": {
                    example: { status: false, errorCode: HttpStatus.BAD_REQUEST, message: "Mô tả lỗi BAD_REQUEST" }
                }
            }
        })
    );

    return applyDecorators(...chainDecors);
};
