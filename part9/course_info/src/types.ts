interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface BasePlusDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends BasePlusDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends BasePlusDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends BasePlusDescription {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
