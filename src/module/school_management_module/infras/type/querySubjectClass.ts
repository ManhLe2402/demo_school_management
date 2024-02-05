export interface IPopulateSubjectClass {
  withSubject?: boolean;
  withTeacher?: boolean;
}

export const getPopulateSubjectClass = (populate: IPopulateSubjectClass) => {
  const populateResult: string[] = [];
  if (populate.withSubject) populateResult.push("subject");
  if (populate.withTeacher) populateResult.push("teacher");

  return { populate: populateResult };
};
