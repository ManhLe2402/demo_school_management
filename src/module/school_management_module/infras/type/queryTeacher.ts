export interface IPopulateTeacher {
  withSchool?: boolean;
}

export const getPopulateTeacher = (populate: IPopulateTeacher): string[] => {
  const populateResult: string[] = [];
  if (populate.withSchool) populateResult.push("school");

  return populateResult;
};
