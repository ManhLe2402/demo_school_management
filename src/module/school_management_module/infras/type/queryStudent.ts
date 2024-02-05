export interface IStudentPopulate {
  withSchool?: boolean;
}

export const getPopulateStudent = (optionsPopulate: IStudentPopulate) => {
  if (optionsPopulate.withSchool) {
    return ["school"];
  }
  return [];
};
