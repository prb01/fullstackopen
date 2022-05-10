import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps): JSX.Element => {
  const { coursePart } = props;
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <i>{coursePart.description}</i>
          </p>
        </div>
      );
      break;
    case "groupProject":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <i>project exercises {coursePart.groupProjectCount}</i>
          </p>
        </div>
      );
      break;
    case "submission":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <i>{coursePart.description}</i>
            <br />
            submit to {coursePart.exerciseSubmissionLink}
          </p>
        </div>
      );
      break;
    case "special":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
            <br />
            <i>{coursePart.description}</i>
            <br />
            required skills: {coursePart.requirements.join(", ")}
          </p>
        </div>
      );
      break;
    default:
      return assertNever(coursePart);
      break;
  }
};

export default Part;
