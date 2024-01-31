import { ClientExeption } from "../exception/clientException";

export const dbDuplicateHandle = (error, mapField?) => {
  if (error.code === 11000) {
    Object.entries(mapField).forEach(([key, value]) => {
      if (error.keyValue[key]) {
        throw new ClientExeption(`${mapField[key]} đã tồn tại`, 4000);
      }
    });
  }
};
