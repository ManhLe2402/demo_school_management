import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export const AP = ApiProperty;

export const APObjectId = () =>
    ApiProperty({
        example: "MongoObjectId",
        type: String
    });

export const APObjectIdArray = () =>
    ApiProperty({
        example: ["MongoObjectId_1", "MongoObjectId_2"],
        type: String,
        isArray: true
    });

export const APEnum = (enumObject: object) => {
    let example;

    const keys = Object.keys(enumObject);
    const values = Object.values(enumObject).filter((value) => keys.includes(value));

    if (values.length == 1) example = values[0];
    else example = values[1];

    return ApiProperty({
        enum: enumObject,
        example: example
    });
};

export const APEnumArray = (enumObject: object) => {
    let example;
    const values = Object.values(enumObject);

    if (values.length < 2) example = values;
    else example = [values[1], values[2]];

    return ApiProperty({
        enum: enumObject,
        isArray: true,
        example: example
    });
};

export const APHide = ApiHideProperty;
