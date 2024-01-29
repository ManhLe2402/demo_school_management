import { isObject } from "./isType";

// remove all dirtyValues from object
export const cleanObject = <T extends Object>(
  object: T,
  dirtyValues: any[] = [undefined],
  options: { deep?: boolean; cleanArrayValue?: boolean } = {}
): T => {
  const newObject = {};
  Object.keys(object).forEach(function (key) {
    if (
      !dirtyValues.some((value) => {
        if (Number.isNaN(value)) return Number.isNaN(object[key]);
        if (typeof value === "function") return value(object[key]);
        return value === object[key];
      })
    ) {
      if (Array.isArray(object[key]) && options.cleanArrayValue)
        newObject[key] = cleanArray(object[key], dirtyValues, {
          ...options,
          deep: true,
          cleanObjectValue: options.deep,
        });
      else if (options.deep && isObject(object[key]))
        newObject[key] = cleanObject(object[key], dirtyValues, options);
      else newObject[key] = object[key];
    }
  });

  return newObject as T;
};

// remove all dirtyValues from array
export const cleanArray = <T>(
  array: T[],
  dirtyValues: any[] = [undefined],
  options: { deep?: boolean; cleanObjectValue?: boolean } = {}
): T[] => {
  const newArray = [];
  array.forEach((el) => {
    if (
      !dirtyValues.some((value) => {
        if (Number.isNaN(value)) return Number.isNaN(el);
        if (typeof value === "function") return value(el);
        return value === el;
      })
    ) {
      if (options.deep && Array.isArray(el))
        newArray.push(cleanArray(el, dirtyValues, options));
      else if (isObject(el) && options?.cleanObjectValue)
        newArray.push(
          cleanObject(el, dirtyValues, {
            ...options,
            deep: true,
            cleanArrayValue: options.deep,
          })
        );
      else newArray.push(el);
    }
  });
  return newArray as T[];
};

// empty Object
export const emptyObject = {};

// empty Func
export const emptyFunc = () => {};

// random an item from an array
export function randomItem(items: Array<any>) {
  return items[Math.floor(Math.random() * items.length)];
}

/*
delay in millisecond, used in async function. example:
async () => {
    do something 
    await delay(1000);
    do somthing 
}
*/
export const delay = (m: number) => new Promise((r) => setTimeout(r, m));
