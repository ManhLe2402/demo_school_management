/* 
Complicate function

Hàm này đổi key của filter = value tương ứng vs key của mapFilter
Ví dụ:

map = {
    name: "mapName",
    role: "mapRole"
} as const (Quan trọng ép kiểu const)

filter = {
    name: "value",
    role: "value",
    age: "value",
    yob: "value"
}

=> modelFilter = {
    "mapName": "value",
    "mapRole": "value",
    age: "value",
    yob: "value"
}

*/

import { isObject } from "class-validator";
import { cleanObject } from "src/base/util/functions";
import { isFunction } from "src/base/util/isType";
import { QueryOption } from "../type/queryOption.pg";



export interface MapModel<M = any> {
    [x: string]: keyof M | ((value: any) => [keyof M, any]);
}

function mergeValue(...objects) {
    const isObject = (obj) => obj && typeof obj === "object";

    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeValue(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
}

// filter = {
//     id: 1,
//     phone: 3,
//     status: 4,
//     sort: {
//         phone: ASC,
//         status: DESC
//     }
// };

// mapFilter = {
//     id: "id",
//     status: "status",
//     phone: (value) => ["user", { phone: value }]
// };

// TODO: Redundant code, rename modelFilter to extract Filter
export const modelFilter = <FT, T extends Record<string, any>>(filter: FT, map: T) => {
    const mergeFilter = {};
    const mapFilter = {};
    const queryOption = {};
    Object.entries(filter).map(([key, value]) => {
        if (map[key]) {
            let _k, _v;
            if (isFunction(map[key])) {
                [_k, _v] = map[key](value);
            } else [_k, _v] = [map[key], value];

            if (mapFilter[_k] && isObject(_v)) _v = mergeValue(mapFilter[_k], _v);
            mapFilter[_k] = _v;
            mergeFilter[_k] = _v;
        } else if (key == "sort") {
            let sort = {};
            for (let prop in value) {
                if (map[prop]) {
                    let _k, _v;
                    if (isFunction(map[prop])) {
                        [_k, _v] = map[prop](value[prop]);
                    } else [_k, _v] = [map[prop], value[prop]];

                    sort[_k] = _v;
                }
            }

            queryOption[key] = sort;
            mergeFilter[key] = sort;
        } else if (["page", "pageSize", "select"].includes(key)) {
            queryOption[key] = value;
            mergeFilter[key] = value;
        } else {
            mergeFilter[key] = value;
        }
    });

    // Ép kiểu, đoạn này code ra nhưng đọc lại cũng ko hiểu lắm, ý nghĩa
    // Xoá những kiểu filter cũ tương ứng vs mapFilter đi và thay thế các kiểu mapFilter vào.

    type MapFilterType = {
        [Key in T[keyof T]]?: any;
    };

    return {
        mergeFilter: cleanObject(mergeFilter, [undefined], { deep: true }) as Omit<FT, keyof T> & MapFilterType,
        mapFilter: cleanObject(mapFilter, [undefined], { deep: true }) as MapFilterType,
        queryOption: queryOption as QueryOption
    };
};

export const extractFilter = modelFilter;
